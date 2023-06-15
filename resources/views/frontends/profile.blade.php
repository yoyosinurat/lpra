@extends('layouts.index')


@section('content')
    @include('partials.navdetail')
    <livewire:list-profile-component />

    @include('partials.footer')
@endsection
