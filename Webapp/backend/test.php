<?php
require("apiConnector.php");
$successmsg = null;
$errormsg = null;
$iframe;

$api = new apiConnector("google.de", 80, 5);
try {
    $test = $api->testConnection();
    if ($test != false) {
        $successmsg = "<b>Success!</b> Connection established, server is up and running.";
        $iframe = $test;
    }
} catch (Exception $e) {
    $errormsg = "<b>Error!</b> Couldn't connect to server: " . $e->getMessage();
}
?>
    <style>
        body {
            font-family: Verdana, sans-serif;
            font-size: 15px;
            line-height: 1.5;
        }

        /* The alert message box */
        .alert {
            padding: 20px;
            color: white;
            margin-bottom: 15px;
        }

        .danger {
            background-color: #f44336; /* Red */
        }

        .success {
            background-color: #4CAF50; /* Green */
        }

        /* The close button */
        .closebtn {
            margin-left: 15px;
            color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
        }

        /* When moving the mouse over the close button */
        .closebtn:hover {
            color: black;
        }
    </style>
    <head>
        <title>Partyplanner - TestAPI</title>
        <h1>Test API Connection</h1>
    </head>
    <body>
    <?php if ($errormsg != null) { ?>
        <div class="alert danger">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            <?php echo $errormsg; ?>
        </div>
        <?php
    }
    if ($successmsg != null) { ?>
        <div class="alert success">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            <?php echo $successmsg; ?>
        </div>
        <?php
    }
    ?>
    <p>Output: </p>
    <textarea style="width: 100%; height: 80%;">
    <?php
    echo $iframe;
    ?>
</textarea>
    </body>
<?php
unset($api);