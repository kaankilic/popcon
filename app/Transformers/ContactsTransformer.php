<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

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
            "fullname" => $contact->fullname,
            "mobile"    => $contact->mobile
        ];
    }
}
