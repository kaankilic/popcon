<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Contacts;
class ContactsTransformer extends TransformerAbstract
{
    /**
    * A Fractal transformer.
    *
    * @return array
    */
    public function transform(Contacts $contact)
    {
        return [
            "id"          => $contact->id,
            "fullname"    => $contact->fullname,
            "name"        => $contact->name,
            "surname"     => $contact->surname,
            "title"       => $contact->title,
            "company"     => $contact->company,
            "mobile"      => $contact->mobile
        ];
    }
}
