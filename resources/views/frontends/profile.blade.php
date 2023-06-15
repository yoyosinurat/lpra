@extends('layouts.index')


@section('content')
    @include('partials.navDetail')
    <livewire:list-profile-component />
@endsection
