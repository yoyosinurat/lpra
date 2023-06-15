<?php

namespace App\Http\Livewire;

use Illuminate\Support\Facades\DB;
use Livewire\Component;

class ListProfileComponent extends Component
{

    public function getProfile(){
        return DB::table('profilelpra')->get();
    }

    public function render(){
        $data = $this->getProfile();
        return view('livewire.list-profile-component', compact('data'));
    }
}
