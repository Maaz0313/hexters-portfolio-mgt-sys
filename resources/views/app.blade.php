<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <meta name="theme-color" content="#0a2550">
    <meta name="force-color-adjust" content="none">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: #0a2550;
            /* Dark blue background from theme image */
            color-scheme: light dark;
        }

        html.dark {
            background-color: #081d40;
            /* Darker blue background from theme image */
        }

        /* Support for Chrome's force dark mode */
        @media (forced-colors: active) {
            :root {
                --color-primary: #0a2550;
                /* Dark blue from theme image */
                --color-primary-foreground: oklch(0.9 0.15 180);
                /* Teal/cyan text color */
            }
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('images/logos/logo white.png') }}" type="image/png">
    <link rel="shortcut icon" href="{{ asset('images/logos/logo white.png') }}" type="image/png">

    <!-- Apple Touch Icon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/logos/logo white.png') }}">

    <!-- For Android Chrome -->
    <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('images/logos/logo white.png') }}">
    <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('images/logos/logo white.png') }}">

    <!-- For Windows -->
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/logos/logo white.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/logos/logo white.png') }}">

    <!-- Web Manifest -->
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Custom Fonts -->
    <style>
        @font-face {
            font-family: 'Library 3 AM';
            src: url('{{ asset('resources/fonts/library-3-am.3am.otf') }}') format('opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'Univia Pro';
            src: url('{{ asset('resources/fonts/UniviaPro-Regular.ttf') }}') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }
    </style>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
