<?php

namespace App\Http\Livewire;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Livewire\Component;
use Livewire\WithFileUploads;
use Intervention\Image\ImageManager as ImageManager;
use Illuminate\Support\Str;


class AddprofileComponent extends Component
{
    use WithFileUploads;
    public $isProfile, $isactive = 1;
    public $tahapan, $photo, $profile = '. . .',$jumlahpetani, $chooseprofile, $lokasi, $luas, $penggunaantanah, $bagiantanah, $sejarahperkebunan, $sejarahpenguasaan, $upayadanperkembangan, $analisishukum, $kesimpulan, $rekomendasi;

    public function uploadImage(){
        $file = $this->photo->store('public/photos/shares');
        $foto = $this->photo->hashName();

        $manager = new ImageManager();

        // https://image.intervention.io/v2/api/fit
        //crop the best fitting 1:1 ratio (200x200) and resize to 200x200 pixel
        $image = $manager->make('storage/photos/shares/'.$foto)->fit(300, 150);
        $image->save('storage/photos/shares/thumbnail/'.$foto);
        return $foto;
    }

    public function updatedPhoto($photo){
        $extension = pathinfo($photo->getFilename(), PATHINFO_EXTENSION);
        if (!in_array($extension, ['png', 'jpeg', 'bmp', 'gif','jpg','webp','mp4', 'avi', '3gp', 'mov', 'm4a'])) {
           $this->reset('photo');
           $message = 'Files not supported';
           $type = 'error'; //error, success
           $this->emit('toast',$message, $type);
        }

    }

    public function checkProfile($profile){
        return DB::table('profilelpra')
                ->select('profile')
                ->where('profile', $profile)
                ->first();

    }

    public function getProfiles(){
            $req = Http::get('https://aws.simontini.id/geoserver/wfs',
            [
                'service' => 'wfs',
                'version' => '1.1.1',
                'request' => 'GetFeature',
                'typename' => 'kpa:KPA_point',
                'propertyName' => 'profil,provinsi,kabupaten,desa,kecamatan,luas_ha,penggunaan,rtpp,lat,long,tahapan',
                'cql_filter' => "profil LIKE '%". $this->chooseprofile ."%'",
                'outputFormat' => 'application/json',
            ]);
            $response = json_decode($req, true);

            $collection = new Collection();
            foreach ($response['features'] as $item => $key ){
                $collection->push((object)[
                    'profil' => $key['properties']['profil'],
                    'provinsi' => $key['properties']['provinsi'],
                    'kabupaten' => $key['properties']['kabupaten'],
                    'desa' => $key['properties']['desa'],
                    'kecamatan' => $key['properties']['kecamatan'],
                    'luas_ha' => $key['properties']['luas_ha'],
                    'penggunaan' => $key['properties']['penggunaan'],
                    'rtpp' => $key['properties']['rtpp'],
                    'tahapan' => $key['properties']['tahapan'],
                ]);
            }


            return $collection->take(5);

    }

    public function setLokasi($provinsi,$kabupaten,$kecamatan,$desa){
        $result = $desa . ', ' . $kecamatan . ', ' . $kabupaten . ', ' . $provinsi;
        return $result;
        // dd($result);
    }

    public function toogleProfile(){
        $this->isProfile = !$this->isProfile;
    }

    public function selectProfile($profile,$luas_ha,$jumlahpetani,$provinsi,$kecamatan,$kabupaten,$desa, $penggunaantanah, $tahapan){
        if($this->checkProfile($profile)){
            $message = 'Profile sudah ada di database.';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            $this->isProfile = false;
        }else{
            $this->profile = $profile;
            $this->lokasi = $this->setLokasi($provinsi,$kabupaten,$kecamatan,$desa);
            $this->luas = $luas_ha;
            $this->jumlahpetani = $jumlahpetani;
            $this->penggunaantanah = $penggunaantanah;
            $this->tahapan = $tahapan;
            $this->isProfile = false;
        };

    }

    public function storeProfile(){
        if($this->manualValidation()){
            DB::table('profilelpra')->insert([
                'profile' => $this->profile,
                'slug' => Str::slug($this->profile,'-'),
                'img' => $this->uploadImage(),
                'lokasi' => $this->lokasi,
                'luas' => $this->luas,
                'tahapan' => $this->tahapan,
                'jumlahpetani' => $this->jumlahpetani,
                'penggunaantanah' => $this->penggunaantanah,
                'bagiantanah' => $this->bagiantanah,
                'sejarahhgu' => $this->sejarahperkebunan,
                'sejarahpenguasaan' => $this->sejarahpenguasaan,
                'upayamasyarakat' => $this->upayadanperkembangan,
                'analisishukum' => $this->analisishukum,
                'kesimpulan' => $this->kesimpulan,
                'Rekomendasi' => $this->rekomendasi,
                'is_active' => $this->isactive,
                'created_at' => Carbon::now('Asia/Jakarta')
            ]);
        }
    }

    public function render(){
        $dataprofiles = $this->getProfiles();
        return view('livewire.addprofile-component', compact('dataprofiles'));
    }



    public function manualValidation(){
        if($this->profile == '' ){
            $message = 'Nama profile harus di isi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->photo == ''){
            $message = 'Gambar profile harus di isi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->lokasi == '' ){
            $message = 'Lokasi profile harus di isi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->luas == '' ){
            $message = 'Luas profile harus di isi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->penggunaantanah == '' ){
            $message = 'Penggunaan tanah harus diisi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->bagiantanah == '' ){
            $message = 'Bagian tanah harus diisi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->sejarahperkebunan == ''){
            $message = 'Sejarah HGU/HGB Perkebunan harus di isi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->sejarahpenguasaan == '' ){
            $message = 'Sejarah Penguasaan Tanah Masyarakat harus di isi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->upayadanperkembangan == '' ){
            $message = 'Upaya Masyarakat dan Pemerintah/Perkembangan Advokasi harus diisi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->analisishukum == '' ){
            $message = 'Analisis Hukum harus di isi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->kesimpulan == '' ){
            $message = 'Kesimpulan harus diisi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }elseif($this->rekomendasi == '' ){
            $message = 'Rekomendasi harus diisi';
            $type = 'error'; //error, success
            $this->emit('toast',$message, $type);
            return;
        }
        return true;
    }
}
