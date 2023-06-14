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

        $items = Item::where($userId)->get();


        return response()->json($items);
    }

    public function store(ItemRequest $request)
    {
        $item = Item::create([
            'name' => $request->input('name'),
            'category_id' => $request->input('category_id'),
            'unit_id' => $request->input('unit_id'),
        ]);

        $createdId = $item->id;

        return response()->json(['item_id' => $createdId]);

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
