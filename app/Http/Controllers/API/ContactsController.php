<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Contacts;
use App\Transformers\ContactsTransformer;
class ContactsController extends Controller
{
    public function getContacts(){
        $contacts = Contacts::orderBy("name","ASC");
        if(request()->has("keyword")){
            $contacts = $contacts->where("name","LIKE","%".request()->get("keyword")."%")->orWhere("surname","LIKE","%".request()->get("keyword")."%");
            $contacts = $contacts->orWhere("mobile","LIKE","%".request()->get("keyword")."%");
        }
        $contacts = $contacts->paginate();
        return fractal($contacts, new ContactsTransformer);
    }
    public function getContact($ID){
        $contact = Contacts::findOrFail($ID);
        return fractal($contact, new ContactsTransformer);
    }
}
