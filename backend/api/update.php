<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../config/database.php';
    include_once '../class/clients.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    $item = new Client($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    
    // Client values
    $item->name = $data->name;
    $item->birth = $data->birth;
    $item->cpf = $data->cpf;
    $item->rg = $data->rg;
    $item->phone = $data->phone;
    
    if($item->updateClient()){
        echo json_encode("Client data updated.");
    } else{
        echo json_encode("Data could not be updated");
    }
?>