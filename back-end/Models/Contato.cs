namespace ContatosApi.Models
{
    public class Contato
    {
        public int idPessoa { get; set; }
        public string nome { get; set; }
        public string dataNascimento { get; set; }
        public string observacoes { get; set; }
        public string email { get; set; }
        public string telefone { get; set; }
    }
}