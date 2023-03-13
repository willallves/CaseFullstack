<?php
    class Client{

        // Connection
        private $conn;

        // Table
        private $db_table = "Client";

        // Columns
        public $id;
        public $name;
        public $birth;
        public $cpf;
        public $rg;
        public $phone;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }

        // GET ALL
        public function getClients(){
            $sqlQuery = "SELECT id, name, birth, cpf, rg, phone FROM " . $this->db_table . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // CREATE
        public function createClient(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        name = :name, 
                        birth = :birth, 
                        cpf = :cpf, 
                        rg = :rg, 
                        phone = :phone";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->birth=htmlspecialchars(strip_tags($this->birth));
            $this->cpf=htmlspecialchars(strip_tags($this->cpf));
            $this->rg=htmlspecialchars(strip_tags($this->rg));
            $this->phone=htmlspecialchars(strip_tags($this->phone));
        
            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":birth", $this->birth);
            $stmt->bindParam(":cpf", $this->cpf);
            $stmt->bindParam(":rg", $this->rg);
            $stmt->bindParam(":phone", $this->phone);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // UPDATE
        public function getSingleClient(){
            $sqlQuery = "SELECT
                        id, 
                        name, 
                        birth, 
                        cpf, 
                        rg, 
                        phone
                      FROM
                        ". $this->db_table ."
                    WHERE 
                       id = ?
                    LIMIT 0,1";

            $stmt = $this->conn->prepare($sqlQuery);

            $stmt->bindParam(1, $this->id);

            $stmt->execute();

            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $this->name = $dataRow['name'];
            $this->birth = $dataRow['birth'];
            $this->cpf = $dataRow['cpf'];
            $this->rg = $dataRow['rg'];
            $this->phone = $dataRow['phone'];
        }        

        // UPDATE
        public function updateClient(){
            $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        name = :name, 
                        birth = :birth, 
                        cpf = :cpf, 
                        rg = :rg, 
                        phone = :phone
                    WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->birth=htmlspecialchars(strip_tags($this->birth));
            $this->cpf=htmlspecialchars(strip_tags($this->cpf));
            $this->rg=htmlspecialchars(strip_tags($this->rg));
            $this->phone=htmlspecialchars(strip_tags($this->phone));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":birth", $this->birth);
            $stmt->bindParam(":cpf", $this->cpf);
            $stmt->bindParam(":rg", $this->rg);
            $stmt->bindParam(":phone", $this->phone);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // DELETE
        function deleteClient(){
            $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            $stmt->bindParam(1, $this->id);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>
