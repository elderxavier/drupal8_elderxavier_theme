<?php
namespace Drupal\drupal8_elderxavier_theme\Controller;
class HelloWorldController {
    public function hello() {
        return array(
                '#title' => 'Hello World!',
                '#markup' => 'Here is some content.',
            );
    }
}