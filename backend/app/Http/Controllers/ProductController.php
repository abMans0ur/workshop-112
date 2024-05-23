<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData=$request->validate([
            'name'=>'required|string|max:255',
            'description'=>'required|string',
            'price'=>'required|numeric|digits_between:1,9999',
            'stock'=>'required|integer|digits_between:0,9999'
        ]);
        $product=Product::create($validatedData);
        return response()->json(['msg'=>'added successfully','product'=>$product],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Product::where('id',$id)->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData=$request->validate([
            'name'=>'required|string|max:255',
            'description'=>'required|string',
            'price'=>'required|numeric',
            'stock'=>'required|integer'
        ]);
        $product=Product::where('id',$id)->first();
        $product->update($validatedData);
        return response()->json(['msg'=>"product #$product->id Updated successfully",'product'=>$product],201);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product=Product::findOrFail($id);
        $product->delete();
        return response()->json(['msg'=>'Product Deleted successfully']);
    }
}
