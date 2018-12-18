<?php
require("apiConnector.php");
$successmsg = null;
$errormsg = null;

$api = new apiConnector("http://google.com", 80);
try{
    if($api->test() == true){
        $successmsg = "Verbindung erfolgreich aufgebaut!";
    }
} catch (Exception $e){
    $errormsg = "<b>Konnte keine Verbindung zum Server aufbauen: </b>" . $e->getMessage();
}
?>
    <style>
        body{
            font-family: Verdana,sans-serif;
            font-size: 15px;
            line-height: 1.5;
        }
        /* The alert message box */
        .alert {
            padding: 20px;
            color: white;
            margin-bottom: 15px;
        }

        .danger{
            background-color: #f44336; /* Red */
        }

        .success{
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
<?php if($errormsg != null) { ?>
    <div class="alert danger">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <?php echo $errormsg; ?>
    </div>
    <?php
}
if($successmsg != null) { ?>
    <div class="alert success">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <?php echo $successmsg; ?>
    </div>
    <?php
}
echo $json_test;
unset($api);