@extends('layouts.index')

@section('content')
    @include('partials.navdetail')

    <div class="max-w-5xl px-4  mx-auto sm:mt-12 mt-4">
        <div class="grid sm:grid-cols-2 grids-cols-1 gap-6 w-full">
            <div class=" col-span-1 sm:h-80 h-full">
                <img src="{{ asset('storage/photos/shares/'.$data->img) }}" alt="" class="w-full h-full">
            </div>
            <div class="col-span-1">
                <h1 class="text-bukanlepra font-semibold text-2xl">{{$data->profile}}</h1>
                <div class="mt-4 flex flex-col space-y-1">
                    <div class="flex sm:space-x-4 space-x-2 items-center">
                        <label class="text-bukanlepra font-semibold">Luas: </label>
                        <p class="">{{$data->luas}} ha</p>
                    </div>

                    <div class="flex sm:space-x-4 space-x-2 items-center w-full ">
                        <label class="text-bukanlepra font-semibold">Jumlah Petani: </label>
                        <p class="">{{$data->jumlahpetani}}</p>
                    </div>

                    <div class="flex sm:space-x-4 space-x-2 items-center w-full ">
                        <label class="text-bukanlepra font-semibold">Penggunaan Tanah: </label>
                        <p class="">{{$data->penggunaantanah}}</p>
                    </div>

                    <div class="flex sm:space-x-4 space-x-2 items-center w-full ">
                        <label class="text-bukanlepra font-semibold">Bagian Tanah: </label>
                        <p class="">{{$data->bagiantanah}}</p>
                    </div>


                    <div class="flex sm:space-x-4 space-x-2">
                        <label class="text-bukanlepra font-semibold">Lokasi: </label>
                        <p class=" text-sm ">{{$data->lokasi}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-12">
            <h1 class="text-bukanlepra font-bold mb-4 text-xl">Sejarah HGU/HGB Perkebunan</h1>
            <div class="prose max-w-none">
                {!! $data->sejarahhgu !!}
            </div>
        </div>

        <div class="mt-12">
            <h1 class="text-bukanlepra font-bold mb-4 text-xl">Sejarah Penguasaan Tanah Masyarakat</h1>
            <div class="prose max-w-none">
                {!! $data->sejarahpenguasaan !!}
            </div>
        </div>

        <div class="mt-12">
            <h1 class="text-bukanlepra font-bold mb-4 text-xl">Upaya Masyarakat dan Pemerintah/Perkembangan Advokasi</h1>
            <div class="prose max-w-none">
                {!! $data->upayamasyarakat !!}
            </div>
        </div>

        <div class="mt-12">
            <h1 class="text-bukanlepra font-bold mb-4 text-xl">Analisis Hukum</h1>
            <div class="prose max-w-none">
                {!! $data->analisishukum !!}
            </div>
        </div>


        <div class="mt-12">
            <h1 class="text-bukanlepra font-bold mb-4 text-xl">Kesimpulan</h1>
            <div class="prose max-w-none">
                {!! $data->kesimpulan !!}
            </div>
        </div>

        <div class="mt-12">
            <h1 class="text-bukanlepra font-bold mb-4 text-xl">Rekomendasi</h1>
            <div class="prose max-w-none">
                {!! $data->Rekomendasi !!}
            </div>
        </div>


    </div>

    <footer class="bg-footer py-4 px-4 sm:mt-12 mt-4">
        <div class="text-center w-full">
            <h2 class="font-bold">Konsorsium Pembaruan Agraria</h2>
            <h3 class="text-sm font-light">Komplek Liga Mas Indah, Jl. Pancoran Indah I, E3/1, Pancoran</h3>
            <h4 class="text-sm font-light">Jakarta Selatan, 12750</h4>
        </div>
    </footer>
@endsection
