<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Models\Item;
use App\Models\Category;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index(ItemRequest $request)
    {

        $userId = $request->user()->id;

        $items = Item::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();


        return response()->json($items);
    }

    public function store(ItemRequest $request)
    {
        $item = Item::create([
            'name' => $request->input('name'),
        ]);

        $userId = $request->user()->id;
        $itemId = $item->id;

        $item->users()->attach($userId,[
            'item_id' => $itemId,
            'user_id' => $request->user()->id
        ]);

        $item::find($itemId)->category()->create([
            'user_id' => $itemId,
            'name' => $request->categoryname
        ]);

        return response()->json("created");
    }


    public function show($item)
    {
        $finditem = Item::find($item);

        if (!$finditem) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        return response()->json($finditem);
    }

    public function update(ItemRequest $request, $item)
    {
        $finditem = Item::find($item);

        if (!$finditem) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $finditem->is_purchase = $request->input('is_purchase');
        $finditem->save();


        return response()->json($finditem);
    }

    public function destroy($item)
    {
        $finditem = Item::find($item);

        if (!$finditem) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $finditem->delete();

        return response()->json(['message' => 'Item deleted']);
    }
}
