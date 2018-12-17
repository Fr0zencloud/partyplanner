<?php
require("apiConnector.php");

$api = new apiConnector("google.com", 80);
try{
    if($api->test()){
        $successmsg = "Verbindung erfolgreich aufgebaut!";
    }
} catch (Exception $e){
    $errormsg = "Konnte keine Verbindung zum Server aufbauen: " . $e->getMessage();
}
?>
    <style>
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
<?php if($successmsg > 0) { ?>
    <div class="alert danger">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <?php echo $errormsg; ?>
    </div>
    <?php
}
if($successmsg > 0) { ?>
    <div class="alert success">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <?php echo $successmsg; ?>
    </div>
    <?php
}
echo $json_test;
unset($api);