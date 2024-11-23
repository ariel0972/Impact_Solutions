// Exibe campos específicos com base no tipo de usuário selecionado
document.getElementById('tipo-usuario').addEventListener('change', function () {
    var tipo = this.value;
    if (tipo === 'voluntario') {
        document.getElementById('dados-voluntario').style.display = 'block';
        document.getElementById('dados-ong').style.display = 'none';
    } else if (tipo === 'ong') {
        document.getElementById('dados-ong').style.display = 'block';
        document.getElementById('dados-voluntario').style.display = 'none';
    } else {
        document.getElementById('dados-voluntario').style.display = 'none';
        document.getElementById('dados-ong').style.display = 'none';
    }
});

// Supondo que esteja usando Node.js com Express
