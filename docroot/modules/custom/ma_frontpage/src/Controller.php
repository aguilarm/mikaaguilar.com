<?php

namespace Drupal\ma_frontpage;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Render\Renderer;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * Renders a plain page
 */
class Controller extends ControllerBase {

  /** @var Renderer Drupal rendering service */
  protected $renderer;

  /**
   * Constructs a new Controller object.
   *
   * @param Renderer $renderer
   *   Drupal rendering service.
   */
  public function __construct(Renderer $renderer) {
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('renderer')
    );
  }

  /**
   * Render a plain page
   *
   * @return \Symfony\Component\HttpFoundation\Response
   */
  public function content() {

    $build = [
      '#theme' => 'html',
      'page' => [
        '#theme' => 'page'
      ]
    ];

    $html = $this->renderer->renderRoot($build);

    return $build;

  }
}
