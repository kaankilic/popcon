<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Contacts;
use App\Transformers\ContactsTransformer;
class ContactsController extends Controller
{
    public function getContacts(){
        $contacts = Contacts::orderBy("name","ASC")->paginate();
        return fractal($contacts, new ContactsTransformer);
    }
}
