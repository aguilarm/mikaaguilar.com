<?php

$settings['hash_salt'] = 'cloudcontroltomajordom';
$settings['update_free_access'] = FALSE;

$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];

$config_directories = [];
$config_directories['sync'] = '../config/sync';

$databases['default']['default'] = array (
  'database' => getenv("MYSQL_DATABASE"),
  'username' => getenv("MYSQL_USER"),
  'password' => getenv("MYSQL_PASSWORD"),
  'prefix' => '',
  'host' => getenv("MYSQL_SERVICE_HOST"),
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);

# TODO - set up purger to get correct hash
$config['varnish_purger.settings.0']['name'] = 'varnish-0';
$config['varnish_purger.settings.1']['name'] = 'varnish-1';

$config['varnish_purger.settings.0']['hostname'] = 'varnish-0.' . getenv("VARNISH_STATEFULSET_DOMAIN");
$config['varnish_purger.settings.1']['hostname'] = 'varnish-1.' . getenv("VARNISH_STATEFULSET_DOMAIN");


$settings['container_yamls'][] = 'sites/default/monolog.services.yml';

/**
 * Redis as a cache backend.
 * You'll need to enable the redis module and have a reachable redis instance running
 * The following lines will only work if the redis module is installed, redis is running, and phpredis is enabled
 */
$settings['redis.connection']['interface'] = 'PhpRedis';
$settings['redis.connection']['host']      = getenv('REDIS_SERVICE_HOST');
$settings['cache']['default'] = 'cache.backend.redis';
$settings['cache']['bins']['bootstrap'] = 'cache.backend.chainedfast';
$settings['cache']['bins']['discovery'] = 'cache.backend.chainedfast';
$settings['cache']['bins']['config'] = 'cache.backend.chainedfast';
$settings['container_yamls'][] = __DIR__ . '/redis.services.yml';

// Environment specific config
$DRUPAL_ENV = getenv("DRUPAL_ENV");

if ($DRUPAL_ENV == "prod") {
	error_reporting(0);
  $config['system.logging']['error_level'] = 'hide';
}

// Remote-only diffs
$REMOTE = [
	"prod",
	"dev",
];

if (in_array($DRUPAL_ENV, $REMOTE)) {
  $settings['container_yamls'][] = __DIR__ . '/services.yml';
  $settings['reverse_proxy'] = TRUE;
  $config['system.performance']['css']['preprocess'] = TRUE;
  $config['system.performance']['js']['preprocess'] = TRUE;
  $config['system.performance']['cache']['page']['max_age'] = 3600;
} 

if ($DRUPAL_ENV == "local") {
  $config['system.performance']['css']['preprocess'] = FALSE;
  $config['system.performance']['js']['preprocess'] = FALSE;
  $settings['container_yamls'][] = __DIR__ . '/development.services.yml';

  assert_options(ASSERT_ACTIVE, TRUE);
  \Drupal\Component\Assertion\Handle::register();

  $config['system.logging']['error_level'] = 'verbose';
  // cache.backend.null must be defined in your development.services.yml before this will work
  $settings['cache']['bins']['render'] = 'cache.backend.null';
  $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
  $settings['skip_permissions_hardening'] = TRUE;
}

