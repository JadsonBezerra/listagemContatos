USE wipro
DECLARE @return_status INT  
EXEC @return_status = atualizarContato @idPessoa=1 ,@nome='Jadson Araujo';
SELECT 'Return Status' = @return_status;  
GO  