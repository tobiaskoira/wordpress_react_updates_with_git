<?php get_header(); ?>

<main class="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pt-20">
    
<div id="react-breadcrumbs"></div>
<section class="py-4">



<section class="py-4 wp-content">
                <?php
        if ( have_posts() ) :
            while ( have_posts() ) :
            the_post();
            the_content();
            endwhile;
        endif;
        ?>
    </section>
<section class="py-4">
    <div id="react-posts"></div>
    
</section>
   
<!-- <section class="py-4">


    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button type="button" class="text-fg-brand border border-brand bg-neutral-primary focus:ring-4 focus:outline-none focus:ring-neutral-tertiary rounded-base text-base font-medium px-5 py-2.5 text-center me-3 mb-3">All categories</button>
        <button type="button" class="text-heading border border-buffer hover:border-default bg-neutral-primary focus:ring-4 focus:outline-none focus:ring-neutral-tertiary rounded-base text-base font-medium px-5 py-2.5 text-center me-3 mb-3">Shoes</button>
        <button type="button" class="text-heading border border-buffer hover:border-default bg-neutral-primary focus:ring-4 focus:outline-none focus:ring-neutral-tertiary rounded-base text-base font-medium px-5 py-2.5 text-center me-3 mb-3">Bags</button>
        <button type="button" class="text-heading border border-buffer hover:border-default bg-neutral-primary focus:ring-4 focus:outline-none focus:ring-neutral-tertiary rounded-base text-base font-medium px-5 py-2.5 text-center me-3 mb-3">Electronics</button>
        <button type="button" class="text-heading border border-buffer hover:border-default bg-neutral-primary focus:ring-4 focus:outline-none focus:ring-neutral-tertiary rounded-base text-base font-medium px-5 py-2.5 text-center me-3 mb-3">Gaming</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt="">
        </div>
        <div>
            <img class="h-auto max-w-full rounded-base" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="">
        </div>
    </div>

</section> -->

<section class="py-4">
    <div id="react-posts-filtering"></div>
    
</section>
    

<section 
class="bg-center bg-no-repeat  bg-dark bg-blend-multiply"
style="background-image: url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg');">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 class="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl">We invest in the world’s potential</h1>
        <p class="mb-8 text-base font-normal text-white md:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4">
            <button type="button" class="inline-flex items-center justify-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-base px-5 py-3 focus:outline-none">
                Getting started
                <svg class="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
            </button>
            <button type="button" class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-base px-5 py-3 focus:outline-none">Learn more</button>
        </div>
    </div>
</section>

<section class="py-4" id="contact-form">
    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">

      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Contact Me
      </h2>

      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
        Got a technical issue? Let us know.
      </p>
<div class="space-y-8"><?php echo do_shortcode('[contact-form-7 id="6417eb6" title="Contact form 1"]'); ?></div>
      

  </div>
</section>

</main>
<div id="accordion-react-root" class="site-main"></div>
<?php get_footer(); ?>

<!-- 
git add front-page.php 
git commit -m "Add contact form shortcode to front page" 
git push 
На сервере (SSH в папке темы): git pull*/  or git pull --rebase origin main -->


