<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="{{asset('/css/app.css')}}">
</head>
<body>
    <div id="app">
        <aside>
            <search></search>
            <users></users>
        </aside>
        <div class="wrapper">
            <router-view></router-view>
        </div>
    </div>
    <script src="{{asset('./js/app.js')}}"></script>
</body>
</html>
