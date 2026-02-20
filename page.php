<?php get_header(); ?>

<main class="flex-1 mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pt-24">

   <div id="react-breadcrumbs"></div> 
   
    <section class="mb-12">
    

    <h2 class="text-3xl font-bold tracking-tight text-heading md:text-4xl"><?php the_title(); ?></h2>

    </section>


    <section class="mb-12">
        <?php
    while ( have_posts() ) :
      the_post();
      the_content(); 
    endwhile;
?>
    </section>

                

</main>
<div id="accordion-react-root" class="site-main"></div>
<?php get_footer(); ?>
