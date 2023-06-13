@extends('layouts.index')

@section('content')
<div class="relative">
    @include('partials.nav')
    <div id="map" class="h-screen relative w-full z-10"></div>
    <div class="absolute bottom-5  right-5 z-20 bg-white py-4 px-4">
        <div class="flex items-center rounded ">
            <input checked  type="checkbox" id="pbsaktif" name="pbsaktif" class="w-3 h-3 accent-black bg-gray-100 border-gray-300 border rounded-full">
            <div class="w-6 h-3 bg-identifikasi ml-2"></div>
            <label for="pbsaktif" class="w-full ml-1 text-xs font-medium text-black">PBS Aktif</label>
        </div>
        <div class="flex items-center rounded mt-2">
            <input checked  type="checkbox" id="pbnaktif" name="bordered-checkbox" class="w-3 h-3 accent-black bg-gray-100 border-gray-300 border rounded-full">
            <div class="w-6 h-3 bg-pemetaan ml-2"></div>
            <label for="bordered-checkbox-2" class="w-full ml-1 text-xs font-medium text-black">PBN Aktif</label>
        </div>
        <div class="flex items-center rounded mt-2">
            <input checked  type="checkbox" id="pbnnonaktif" name="bordered-checkbox" class="w-3 h-3 accent-black bg-gray-100 border-gray-300 border rounded-full">
            <div class="w-6 h-3 bg-pengorganisasian ml-2"></div>
            <label for="bordered-checkbox-2" class="w-full ml-1 text-xs font-medium text-black">PBN Nonaktif</label>
        </div>
        <div class="flex items-center rounded mt-2">
            <input checked  type="checkbox" id="pbsnonaktif" name="bordered-checkbox" class="w-3 h-3 accent-black bg-gray-100 border-gray-300 border rounded-full">
            <div class="w-6 h-3 bg-pbsnonaktif ml-2"></div>
            <label for="bordered-checkbox-2" class="w-full ml-1 text-xs font-medium text-black">PBS Nonaktif</label>
        </div>
        <div class="flex items-center rounded mt-2">
            <input checked  type="checkbox" id="tanahnegara" name="bordered-checkbox" class="w-3 h-3 accent-black bg-gray-100 border-gray-300 border rounded-full">
            <div class="w-6 h-3 bg-redistribusi ml-2"></div>
            <label for="bordered-checkbox-2" class="w-full ml-1 text-xs font-medium text-black">Tanah Negara</label>
        </div>
    </div>
</div>



@endsection

@push('scripts')
    <script src="{{ asset('js/map.js') }}"></script>
@endpush
