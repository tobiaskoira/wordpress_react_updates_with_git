<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<?php wp_head(); ?>
</head>

<body <?php body_class('min-h-screen flex flex-col'); ?>>

<header  class="w-full">

	<nav id="site-header" class="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default transition-all duration-300">
		<!-- <div>
			<?php 
				if ( ! is_user_logged_in(  ) ) {
					// echo do_shortcode( '[ultimatemember form_id="76"]' );	
                    echo do_shortcode( '[ultimatemember form_id="81"]' );	
					}
			?> 
		</div> -->
<div class="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 flex flex-wrap items-center justify-between p-2 md:p-4">
			<a href="https://red-hawk-302088.hostingersite.com" class="flex items-center space-x-3 rtl:space-x-reverse">
				<img src="https://flowbite.com/docs/images/logo.svg" class="h-7" alt="Flowbite Logo">
				<span class="self-center text-sm md:text-xl text-heading font-semibold whitespace-nowrap">Mytest_Page</span>
			</a>
			<div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
				<a href="#contact-form" class=" hidden md:flex text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-base px-5 py-3 focus:outline-none">Contact me</a>
				<button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-cta" aria-expanded="false">
					<span class="sr-only">Open main menu</span>
					<svg class="w-16 h-16" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"></path></svg>
				</button>
                <div id="react-auth-button"></div>
               
            </div>
			<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
				<?php 
					wp_nav_menu([
						'theme_location' => 'primary',
						'container' => false,
						'menu_class' => 'font-medium flex flex-col gap-4 p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 md:gap-0 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary',

						'fallback_cb'    => false,
						'depth'          => 1,
					])
				?>

			</div>




<!-- Modal toggle -->


<!-- Main modal -->
<div id="authentication-modal" tabindex="-1" aria-hidden="true" 
class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
            <!-- Modal header -->
            <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 class="text-lg font-medium text-heading">
                    Sign in to our platform
                </h3>
                <button type="button" class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
           

            <div class="pt-4 md:pt-6 ">
            <div id="react-login"></div>
            </div>

        </div>
    </div>
</div> 



		
	</nav>

</header>
