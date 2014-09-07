<!DOCTYPE html>
<html>
<head>
    <title><?php echo isset($title) ? $title : config('blog.title') ?></title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" user-scalable="no" />
    <meta name="description" content="<?php echo config('blog.description')?>" />

    <link rel="alternate" type="application/rss+xml" title="<?php echo config('blog.title')?>  Feed" href="<?php echo site_url()?>rss" />

    <link href="css/blog.css" rel="stylesheet" />
    
    
    <link href='//fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700' rel='stylesheet' type='text/css'>

    <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

</head>
<body>
    <main>
        <div id="hdWrap">
            <div id="header">
                <div>
                    <h1><a href="<?php echo site_url() ?>">{<?php echo config('blog.title') ?>}</a></h1>

                    <p class="description"><?php echo config('blog.description')?></p>
        
                    <a id="sideLogo" href="http://mikaaguilar.com/"></a>
        
                    <nav>
                        <a href="<?php echo site_url() ?>">front page</a>
                        <a href="">!!latest post</a>
                        <p>filter:</p>
                        <a href="">!!by date:</a>
                        <a href="">!!by tag:</a>
                    </ul>

                    <p class="author"><?php echo config('blog.authorbio') ?></p>
                </div>
            </div>
        </div>
        <section id="content">

            <?php echo content()?>

        </section>
    </main>
</body>
</html>