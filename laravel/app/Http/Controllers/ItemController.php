<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }

    public function store(ItemRequest $request)
    {
        $item = Item::create([
            'item' => $request->input('item'),
            'user_id' => $request->user()->id
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

        $finditem->item = $request->input('item');
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
