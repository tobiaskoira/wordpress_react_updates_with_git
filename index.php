<?php get_header(); ?>

<main class="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pt-20">
  <?php
  if ( have_posts() ) :
    while ( have_posts() ) :
      the_post();
      the_content();
    endwhile;
  endif;
  ?>

  


</main>
<div id="accordion-react-root" class="site-main"></div>
<?php get_footer(); ?>

