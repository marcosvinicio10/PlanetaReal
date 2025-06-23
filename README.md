# PlanetaReal - Plataforma de Sustentabilidade

## 🌍 Sobre o Projeto

O PlanetaReal é uma plataforma interativa e educativa que ajuda pessoas a descobrirem o impacto ambiental de seu estilo de vida e oferece planos personalizados de ação para reduzir a pegada ecológica.

## 🚀 Como Acessar

1. **Abra o arquivo `index.html`** no seu navegador
2. Ou use um servidor local:
   ```bash
   # Se você tem Python instalado
   python -m http.server 8000
   
   # Se você tem Node.js instalado
   npx serve .
   ```

## 📱 Páginas Disponíveis

### 1. **Página Inicial** (`index.html`)
- Apresentação do projeto
- Links para todas as funcionalidades
- Estatísticas e depoimentos
- **Acesso**: Abra `index.html` diretamente

### 2. **Calculadora de Pegada Ecológica** (`calculator.html`)
- Calculadora interativa com 5 etapas
- Perguntas sobre transporte, moradia, alimentação, consumo e resíduos
- Resultados detalhados com recomendações
- **Acesso**: Clique em "Calcule sua Pegada Ecológica" na página inicial

### 3. **Dashboard do Usuário** (`dashboard.html`)
- Gráficos de impacto em CO₂, água, energia e lixo
- Histórico de progresso ambiental
- Recomendações personalizadas
- Ranking da comunidade
- **Acesso**: Clique em "Dashboard" no menu de navegação

### 4. **Desafios Sustentáveis** (`challenges.html`)
- Desafios semanais gamificados
- Sistema de pontos e badges
- Progresso visual
- **Acesso**: Clique em "Desafios" no menu de navegação

### 5. **Comunidade Verde** (`community.html`)
- Fórum para troca de experiências
- Posts sobre sustentabilidade
- Sistema de curtidas e comentários
- **Acesso**: Clique em "Comunidade" no menu de navegação

## 🎯 Funcionalidades Principais

### Calculadora de Pegada Ecológica
- **5 etapas interativas**: Transporte, Moradia, Alimentação, Consumo, Resíduos
- **Sliders e seleções múltiplas** para respostas
- **Resultados detalhados** com breakdown por categoria
- **Recomendações personalizadas** baseadas nos resultados

### Dashboard Interativo
- **Gráficos dinâmicos** usando Chart.js
- **Métricas em tempo real** de impacto ambiental
- **Sistema de conquistas** e badges
- **Ranking da comunidade**

### Sistema de Desafios
- **Desafios semanais** com diferentes níveis de dificuldade
- **Sistema de progresso** visual
- **Recompensas** em pontos e badges
- **Filtros por categoria** e dificuldade

### Comunidade
- **Posts interativos** com curtidas e comentários
- **Filtros por tipo** de conteúdo
- **Sistema de notificações**
- **Criação de posts** personalizados

## 🎨 Recursos Visuais

### Tema Escuro/Claro
- Clique no ícone da lua/sol no header para alternar
- Preferência salva automaticamente

### Design Responsivo
- Funciona em desktop, tablet e mobile
- Menu hambúrguer para dispositivos móveis

### Animações Suaves
- Transições entre páginas
- Animações de loading
- Efeitos hover nos elementos

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com Flexbox e Grid
- **JavaScript** - Funcionalidades interativas
- **Chart.js** - Gráficos no dashboard
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia Poppins

## 📁 Estrutura de Arquivos

```
PlanetaReal/
├── index.html              # Página inicial
├── calculator.html         # Calculadora de pegada ecológica
├── dashboard.html          # Dashboard do usuário
├── challenges.html         # Página de desafios
├── community.html          # Página da comunidade
├── css/
│   ├── style.css          # Estilos principais
│   ├── calculator.css     # Estilos da calculadora
│   ├── dashboard.css      # Estilos do dashboard
│   ├── challenges.css     # Estilos dos desafios
│   └── community.css      # Estilos da comunidade
├── js/
│   ├── main.js            # JavaScript principal
│   ├── calculator.js      # Lógica da calculadora
│   ├── dashboard.js       # Lógica do dashboard
│   ├── challenges.js      # Lógica dos desafios
│   └── community.js       # Lógica da comunidade
└── README.md              # Este arquivo
```

## 🐛 Correções de Bugs

### Problemas Corrigidos:
1. **Navegação entre páginas** - Links corrigidos para apontar para arquivos HTML
2. **Logo clicável** - Adicionado link para página inicial
3. **JavaScript da calculadora** - Criado arquivo específico com funcionalidades completas
4. **Dashboard com gráficos** - Integração com Chart.js
5. **Sistema de notificações** - Adicionado ao CSS e JavaScript
6. **Responsividade** - Melhorada para dispositivos móveis

### Como Testar:
1. Abra `index.html` no navegador
2. Navegue entre as páginas usando o menu
3. Teste a calculadora completa
4. Verifique os gráficos no dashboard
5. Teste os filtros na página de desafios
6. Interaja com posts na comunidade

## 🚀 Próximos Passos

- [ ] Integração com backend
- [ ] Sistema de autenticação
- [ ] Banco de dados para usuários
- [ ] API para cálculos mais precisos
- [ ] Sistema de notificações push
- [ ] App mobile

## 📞 Suporte

Se encontrar algum problema ou tiver sugestões, verifique:
1. Se todos os arquivos estão na mesma pasta
2. Se o navegador suporta JavaScript moderno
3. Se não há bloqueadores de scripts ativos

---

**Desenvolvido com ❤️ para um futuro mais sustentável** 