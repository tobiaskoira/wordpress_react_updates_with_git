<?php get_header(); ?>

<main class="flex-1 mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pt-24">

   <div id="react-breadcrumbs"></div> 
   
    <section class="mt-6">
    

    <h1 class="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl"><?php the_title(); ?></h2>

    </section>


    <section class="mb-12">
        <p class="mb-3 text-body">
        <?php
        while ( have_posts() ) :
        the_post();
        the_content(); 
        endwhile;
        ?>
        </p>
    </section>
<section class="py-4">
    <div id="react-posts"></div>
    
</section>
           

</main>
<div id="accordion-react-root" class="site-main"></div>
<?php get_footer(); ?>