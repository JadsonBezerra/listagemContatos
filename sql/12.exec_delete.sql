USE wipro
DECLARE @return_status INT  
EXEC @return_status = removerContato @idPessoa=1;
SELECT 'Return Status' = @return_status;  
GO  