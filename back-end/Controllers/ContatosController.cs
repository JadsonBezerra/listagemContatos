using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Data.SqlClient;
using ContatosApi.Models;
using System.Text.Json;

namespace ContatosApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContatosController : ControllerBase
    {
        private readonly ILogger<ContatosController> _logger;
        SqlConnection cnn = new SqlConnection("Data Source=172.17.0.1,1433;Initial Catalog=wipro; User ID=SA;Password=<sql@123>");

        public ContatosController(ILogger<ContatosController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Contato> GetAll()
        {
            cnn.Open();

            SqlCommand cmd = new SqlCommand("EXEC selectContatos", cnn);
            SqlDataReader dr = cmd.ExecuteReader();

            List<Contato> retorno = new List<Contato>();

            while(dr.Read()){
                retorno.Add(new Contato{
                    idPessoa = (int)dr["idPessoa"],
                    dataNascimento = ((System.DateTime)dr["dataNascimento"]).ToString(),
                    nome = (string)dr["nome"],
                    email = (string)dr["email"],
                    observacoes = (string)dr["observacoes"],
                    telefone = (string)dr["telefone"],
                });
            }

            cnn.Close();

            System.Console.WriteLine(retorno.ToArray());
            return retorno.ToArray();
        }
        [HttpPost]
        public string Post(Contato contato)
        {
            cnn.Open();

            SqlCommand cmd = new SqlCommand(String.Format("EXEC inserirContato @nome='{0}', @dataNascimento='{1}', @observacoes='{2}', @email='{3}', @telefone='{4}';",contato.nome,contato.dataNascimento,contato.observacoes,contato.email,contato.telefone), cnn);
            string response = (string)cmd.ExecuteScalar().ToString();

            cnn.Close();

            System.Console.WriteLine(response);
            return response;
        }

        [HttpPatch("{id}")]
        public string Patch(int id, Contato contato)
        {
            cnn.Open();

            SqlCommand cmd = new SqlCommand(String.Format("EXEC atualizarContato @nome='{0}', @dataNascimento='{1}', @observacoes='{2}', @email='{3}', @telefone='{4}', @idPessoa='{5}';",contato.nome,contato.dataNascimento,contato.observacoes,contato.email,contato.telefone,id), cnn);
            string response = (string)cmd.ExecuteScalar().ToString();

            cnn.Close();

            System.Console.WriteLine(response);
            return response;
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            cnn.Open();

            SqlCommand cmd = new SqlCommand(String.Format("EXEC removerContato @idPessoa={0};",id), cnn);
            string response = (string)cmd.ExecuteScalar().ToString();

            cnn.Close();

            System.Console.WriteLine(response);
            return response;
        }
        [HttpGet("{id}")]
        public Object Get(int id)
        {
            cnn.Open();

            SqlCommand cmd = new SqlCommand(String.Format("EXEC getContato @idPessoa={0};",id), cnn);
            SqlDataReader dr = cmd.ExecuteReader();
            Contato res;
            try{
                dr.Read();
                res = new Contato
                    {
                        idPessoa = (int)dr["idPessoa"],
                        dataNascimento = ((System.DateTime)dr["dataNascimento"]).ToString(),
                        nome = (string)dr["nome"],
                        email = (string)dr["email"],
                        observacoes = (string)dr["observacoes"],
                        telefone = (string)dr["telefone"],
                    };
                
                cnn.Close();

                string jsonString = JsonSerializer.Serialize(res);
                System.Console.WriteLine(jsonString);
                return res;
            }
            catch{
                System.Console.WriteLine("Contato com esse ID não existe!");
                return "Contato com esse ID não existe!";
            }
        }
    }
}
