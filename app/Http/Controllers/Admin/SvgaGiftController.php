<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Google\Cloud\Firestore\FirestoreClient;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class SvgaGiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Svga/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Svga/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate(
            [
                'name'    => 'required',
                'category'    => 'required',
                'diamond' => 'required',
                // 'img' => 'required|mimes:svga,gif,webp'
                'img' => 'required'
            ]
        );

        $data = [
            'name' => $request->name,
            'category' => $request->category,
            'diamond' => $request->diamond,
            // 'img'=> $request->img,
        ];

        if ($request->file('img')) {

            $file = $request->file('img');

            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $filePath = public_path('svga/');

            // Ensure the directory exists
            if (!file_exists($filePath)) {
                mkdir($filePath, 0777, true);
            }

            // Move the file
            $file->move($filePath, $fileName);

            $data['img'] = url('/svga').'/'.$fileName;


            // $imagethumbnail = $request->file('img');
            // $extension = $imagethumbnail->getClientOriginalExtension();
            // $thumbnailname = Str::uuid() . '.' . $extension;

            // $manager = new ImageManager(Driver::class);
            // $img = $manager->read($request->file('img'));
            // // $img = $img->scale(720);

            // $path_name = "svga/" . $thumbnailname;
            // $some = $img->save(public_path($path_name));

            // $data['img'] = url('/svga').'/'.$thumbnailname;


            // ProfilePhoto::updateOrInsert(['uid' => $uid], ['uid' => $uid, 'photo' => $thumbnailname]);

            // $firebaseUser = $this->firestore->collection('users')->document($uid);

            // $firebaseUser->update([
            //     ['path' => 'img', 'value' =>  url('/avatar').'/'.$thumbnailname]
            // ]);


            // return response()->json([
            //     'message' => "sucess",
            //     'some' => $some
            // ]);
        }


        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);


        $firebaseUser = $firestore->collection('svgas')->add($data);


        return to_route('svga.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
