<p align="center">
  <a href="../../SECURITY.md">English</a> |
  <a href="SECURITY.zh-CN.md">简体中文</a> |
  <a href="SECURITY.ja-JP.md">日本語</a> |
  <a href="SECURITY.ko-KR.md">한국어</a> |
  <a href="SECURITY.vi-VN.md">Tiếng Việt</a> |
  <strong>Portugues</strong>
</p>

# Política de Segurança

## Versões Suportadas

| Versão | Suportada |
|---------|-----------|
| Release mais recente | Sim |
| Versões anteriores | Não |

## Reportando uma Vulnerabilidade

**NÃO abra uma issue pública para vulnerabilidades de segurança.**

Em vez disso, use o GitHub Security Advisories pra reportar vulnerabilidades de forma privada:

[Reportar uma vulnerabilidade](https://github.com/withkynam/vibecode-pro-max-kit/security/advisories/new)

> **Nota:** O Private Vulnerability Reporting precisa estar habilitado nas configurações do repositório para o botão "Report a vulnerability" aparecer.

### Prazo de Resposta

- **48 horas** de confirmação de recebimento do seu report
- **7 dias** para avaliação inicial e classificação de severidade
- Vamos te manter informado do progresso durante todo o processo

## Escopo

### Dentro do Escopo

- **Scripts de hook** (`privacy-block.cjs`, `scout-block.cjs`) — vulnerabilidades de bypass que permitem agentes acessarem recursos bloqueados
- **install.sh** — ataques de supply chain, injeção de comandos ou path traversal
- **Prompts de agentes** — prompt injection que burla o phase-locking ou restrições de ferramentas
- **Vazamentos de privacidade** — agente acessando credenciais, API keys ou arquivos sensíveis apesar dos guardrails
- **Injeção em system-reminder / subagent-init** — ataques de injeção de contexto que manipulam o comportamento do agente

### Fora do Escopo

- Vulnerabilidades no Claude Code ou Codex propriamente ditos (reporte pra Anthropic ou OpenAI respectivamente)
- Problemas no código do projeto do usuário (não no harness)
- Ataques de engenharia social contra maintainers

## Prazo de Divulgação

- Nosso objetivo é corrigir vulnerabilidades confirmadas em até **30 dias**
- Divulgação coordenada após a correção ser lançada
- Crédito dado ao reporter nas notas de release (a menos que você prefira anonimato)

## Safe Harbor

Consideramos pesquisas de segurança conduzidas de boa-fé como autorizadas. Não tomaremos ações legais contra pesquisadores que agem de boa-fé e seguem esta política.

Se você não tem certeza se sua pesquisa se qualifica, entre em contato antes de testar — teremos prazer em esclarecer o escopo.