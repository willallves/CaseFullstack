<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../config/database.php';
    include_once '../class/clients.php';

    $database = new Database();
    $db = $database->getConnection();

    $items = new Client($db);

    $stmt = $items->getClients();
    $itemCount = $stmt->rowCount();


    echo json_encode($itemCount);

    if($itemCount > 0){
        
        $ClientArr = array();
        $ClientArr["body"] = array();
        $ClientArr["itemCount"] = $itemCount;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "name" => $name,
                "birth" => $birth,
                "cpf" => $cpf,
                "rg" => $rg,
                "phone" => $phone
            );

            array_push($ClientArr["body"], $e);
        }
        echo json_encode($ClientArr);
    }

    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No record found.")
        );
    }
?>