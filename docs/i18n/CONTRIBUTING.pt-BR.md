<p align="center">
  <a href="../../CONTRIBUTING.md">English</a> |
  <a href="CONTRIBUTING.zh-CN.md">简体中文</a> |
  <a href="CONTRIBUTING.ja-JP.md">日本語</a> |
  <a href="CONTRIBUTING.ko-KR.md">한국어</a> |
  <a href="CONTRIBUTING.vi-VN.md">Tiếng Việt</a> |
  <strong>Portugues</strong>
</p>

# Contribuindo para o vibecode-pro-max-kit

Obrigado pelo interesse em contribuir com o vibecode-pro-max-kit! Esse projeto oferece um harness de agente pronto pra uso para Claude Code e Codex, e contribuições de todo mundo são bem-vindas.

Ao participar deste projeto, você concorda em seguir nosso [Código de Conduta](../../CODE_OF_CONDUCT.md).

---

## Canais de Comunicação

- **WhatsApp (principal):** [Entre no nosso grupo da comunidade](https://chat.whatsapp.com/E42ySo6iGmuAyeh25eAXuu?s=cl&p=i&mlu=1)
- **GitHub Issues:** Reports de bugs, solicitações de features e acompanhamento de tarefas
- **GitHub Discussions:** Perguntas, ideias e conversas gerais

> Esse é nosso único canal de comunidade — não usamos Discord, Slack ou outras plataformas.

---

## Pré-requisitos para Desenvolvimento

Antes de contribuir, certifique-se de ter o seguinte instalado:

- **Node.js** >= 20
- **bash** ou **zsh** shell
- **git** >= 2.30
- **Sistema operacional:** macOS, Linux ou Windows com WSL2

Nenhum package manager ou runtime adicional é necessário. O harness foi projetado pra ter zero dependências.

---

## Tipos de Contribuição

Aceitamos vários tipos de contribuições:

### Skills

Skills são módulos de capacidade reutilizáveis que ficam em `.claude/skills/`. Cada skill deve:

- Ter seu próprio diretório (ex: `.claude/skills/my-skill/`)
- Conter um arquivo `SKILL.md` com YAML frontmatter (name, description, triggers)
- **Não** usar o prefixo `vc-` — esse prefixo é reservado para skills oficiais do harness
- Incluir scripts auxiliares em um subdiretório `scripts/` se necessário

### Agentes

Definições de agentes fornecem personas especializadas para diferentes fases do workflow. Cada agente deve:

- Ter uma versão em `.claude/agents/` (para Claude Code) e uma versão em `.codex/agents/` (para Codex)
- Manter paridade entre as duas versões
- Seguir as convenções de nomenclatura existentes

### Hooks

Hooks de pré e pós-execução que ficam em `.claude/hooks/`. Eles rodam automaticamente em pontos específicos do ciclo de vida das sessões do Claude Code.

### Protocolos

Documentos de protocolo de desenvolvimento em `process/development-protocols/` que definem regras e convenções de workflow compartilhadas.

### Traduções

Versões localizadas de documentação e descrições de skills para tornar o harness acessível a mais desenvolvedores.

### Documentação

Melhorias no README.md, CLAUDE.md, AGENTS.md, comentários inline ou qualquer outra documentação.

### Correções de Bugs

Correções para scripts de validação, lógica de instalação, templates seed ou qualquer funcionalidade existente.

---

## Começando

1. **Fork** o repositório no GitHub

2. **Clone** seu fork localmente:

   ```bash
   git clone https://github.com/<your-username>/vibecode-pro-max-kit.git
   cd vibecode-pro-max-kit
   ```

3. **Instale** o harness em um projeto de teste pra verificar que tudo funciona:

   ```bash
   # A partir de um diretório de projeto de teste
   bash /path/to/vibecode-pro-max-kit/install.sh
   ```

4. **Rode a skill de setup** pra verificar o harness instalado:

   ```bash
   # Dentro de uma sessão do Claude Code no projeto de teste
   # Invoque a skill vc-setup
   ```

5. **Rode os scripts de validação** pra confirmar que seu ambiente está correto:

   ```bash
   node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
   node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
   ```

   Todas as validações devem passar antes de você começar a fazer mudanças.

---

## Visão Geral da Arquitetura

O harness segue uma arquitetura de superfície dupla para compatibilidade entre Claude Code e Codex:

```
.claude/
  agents/          # Definições de agentes para Claude Code (*.md)
  skills/          # Módulos de skills compartilhados (cada skill é um diretório com SKILL.md)
  hooks/           # Hooks de pré/pós execução
.codex/
  agents/          # Definições de agentes para Codex (espelhados de .claude/agents/)
process/
  development-protocols/   # Regras e convenções de workflow compartilhadas
  context/                 # Conhecimento e documentação de contexto do projeto
  _seeds/                  # Templates seed para scaffolding de novos projetos
```

Skills são compartilhadas entre ambas as superfícies via o symlink `.agents/skills` que o Codex usa para descobrir `.claude/skills/`.

Veja CLAUDE.md e AGENTS.md para detalhes completos da arquitetura.

---

## Diretrizes de Pull Request

### Escopo

- Mantenha pull requests focados: **um tipo de contribuição por PR**
- Uma adição de skill, um par de agentes, uma correção de bug, etc.
- Se sua mudança toca múltiplas áreas, divida em PRs separados
- Tamanho alvo: **200-400 linhas** de mudanças significativas

### Contribuições Assistidas por IA

Contribuições assistidas por IA são bem-vindas e encorajadas. Isso é um harness de agente de IA — faz sentido usar ferramentas de IA pra construí-lo. Só garanta que você revisou e entende o que está submetendo.

### Mensagens de Commit

Use o formato de conventional commits:

- `feat:` — Nova skill, agente, hook ou capacidade
- `fix:` — Correção de bug em funcionalidade existente
- `docs:` — Mudanças apenas em documentação
- `chore:` — Manutenção, refatoração ou mudanças de tooling

Exemplos:

```
feat: add code-coverage skill with lcov parsing
fix: correct symlink detection in install.sh on WSL2
docs: add examples to vc-generate-plan SKILL.md
chore: update validate-skills.mjs to check frontmatter
```

### Nomenclatura de Branches

Use nomes de branch descritivos:

```
feat/my-new-skill
fix/install-symlink-wsl
docs/contributing-guide
```

### Descrição do PR

Inclua na descrição do seu pull request:

- O que a mudança faz e por quê
- Como você testou (quais scripts de validação rodou)
- Quaisquer breaking changes ou notas de migração

---

## vc-manifest.json

O arquivo `vc-manifest.json` na raiz do repositório rastreia todos os arquivos gerenciados no harness. Quando você adicionar novos arquivos (skills, agentes, hooks, protocolos, seeds), você deve atualizar esse manifest.

O manifest é usado pelo `install.sh` e `vc-update` pra saber quais arquivos copiar e sincronizar. Se seu novo arquivo não estiver listado no manifest, ele não será incluído quando usuários instalarem ou atualizarem o harness.

Ao modificar o manifest:

- Adicione os paths dos seus novos arquivos na seção apropriada
- Mantenha as entradas ordenadas alfabeticamente dentro de cada seção
- Rode os scripts de validação após atualizar pra confirmar consistência

---

## Checklist de Contribuição de Skill

Antes de submeter uma nova skill, verifique:

- [ ] Skill está em seu próprio diretório em `.claude/skills/<skill-name>/`
- [ ] `SKILL.md` existe com YAML frontmatter válido (name, description, no mínimo)
- [ ] Nome da skill **não** usa o prefixo `vc-` (reservado para skills oficiais)
- [ ] Scripts auxiliares estão em um subdiretório `scripts/`
- [ ] `vc-manifest.json` foi atualizado com todos os novos paths de arquivo
- [ ] Validação passa:

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-skills.mjs
  ```

---

## Checklist de Contribuição de Agente

Antes de submeter um novo agente, verifique:

- [ ] Definição do agente existe em `.claude/agents/<agent-name>.md`
- [ ] Definição correspondente existe em `.codex/agents/<agent-name>.md`
- [ ] Ambas as versões são funcionalmente equivalentes (mesmo propósito, mesmas restrições de ferramentas)
- [ ] Validação de paridade de agentes passa:

  ```bash
  node .claude/skills/vc-audit-vc/scripts/validate-agent-parity.mjs
  ```

---

## Processo de Review

Após você submeter um pull request:

- Um maintainer vai revisar seu PR em até **48 horas úteis** (meta flexível, não uma garantia)
- Scripts de validação do CI devem passar antes da review
- É necessária pelo menos **uma aprovação de maintainer** pra fazer merge
- **Não é necessário CLA** — sua contribuição é regida pela licença MIT do repositório

Se mudanças forem solicitadas, por favor faça-as em commits de follow-up (não faça force-push por cima de comentários de review).

---

## Reconhecimento

Todos os contribuidores são reconhecidos:

- **Seção de Contributors no README** — Gerada automaticamente via [contrib.rocks](https://contrib.rocks) (banner visual)
- **Tabela detalhada de contribuidores** — Gerenciada via bot [all-contributors](https://allcontributors.org/), que reconhece todos os tipos de contribuição (código, docs, design, ideias, testes, reports de bugs). O bot atualiza automaticamente o README via PR quando contribuidores são adicionados.
- **Notas de Release no GitHub** — Contribuidores creditados em cada release
- **Créditos em Skills/Agentes** — Seu nome no campo `metadata.author` da sua contribuição

Veja `.all-contributorsrc` para configuração do bot (criado quando o bot é inicializado pela primeira vez).

### Escada de Contribuidores

- **Contributor** — Qualquer pessoa com um PR mergeado
- **Reviewer** — Contribuidores regulares convidados pra revisar PRs
- **Maintainer** — Contribuidores de confiança com acesso de merge

Avanço é baseado em qualidade e consistência das contribuições, não em volume.

---

## Política de Contribuição

PRs devem referenciar uma issue existente. PRs avulsos sem contexto podem ser fechados.

Contribuidores top podem ser convidados como maintainers.

---

Obrigado por ajudar a tornar o vibecode-pro-max-kit melhor pra todo mundo!