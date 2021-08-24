USE wipro
DECLARE @return_status INT  
EXEC @return_status = inserirContato @nome='Jadson Bezerra', @dataNascimento='1997-11-12', @observacoes='nenhum', @email='jadson013@gmail.com',@telefone='84981046028';
SELECT 'Return Status' = @return_status;  
GO  