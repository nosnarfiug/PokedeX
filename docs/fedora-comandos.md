# Guia de Comandos Fedora

## Atualizações do Sistema

```bash
# Atualizar lista de pacotes e instalar atualizações
sudo dnf update

# Atualizar o sistema completo (incluindo kernel)
sudo dnf upgrade

# Verificar atualizações disponíveis sem instalar
sudo dnf check-update

# Atualização completa de versão do Fedora (ex: F40 → F41)
sudo dnf system-upgrade download --releasever=41
sudo dnf system-upgrade reboot
```

---

## Gerenciamento de Pacotes (DNF)

```bash
# Instalar um pacote
sudo dnf install nome-do-pacote

# Remover um pacote
sudo dnf remove nome-do-pacote

# Buscar um pacote
dnf search nome-do-pacote

# Ver informações de um pacote
dnf info nome-do-pacote

# Listar pacotes instalados
dnf list installed

# Remover pacotes que não são mais necessários
sudo dnf autoremove

# Limpar cache do DNF
sudo dnf clean all
```

---

## Flatpak (apps GUI via Flathub)

```bash
# Adicionar repositório Flathub
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

# Instalar um app
flatpak install flathub nome.do.App

# Remover um app
flatpak uninstall nome.do.App

# Atualizar todos os apps Flatpak
flatpak update

# Listar apps instalados
flatpak list
```

---

## Arquivos e Diretórios

```bash
# Listar arquivos (detalhado)
ls -lh

# Listar todos incluindo ocultos
ls -lha

# Navegar entre pastas
cd /caminho/da/pasta
cd ~          # ir para home
cd ..         # voltar um nível

# Criar diretório
mkdir nome-da-pasta

# Criar múltiplos níveis de diretório
mkdir -p pasta/subpasta/subsubpasta

# Copiar arquivo
cp origem destino

# Mover ou renomear
mv origem destino

# Remover arquivo
rm arquivo.txt

# Remover pasta e todo conteúdo (CUIDADO)
rm -rf pasta/

# Ver espaço em disco
df -h

# Ver tamanho de pastas
du -sh /caminho/*
```

---

## Permissões

```bash
# Dar permissão de execução
chmod +x script.sh

# Mudar dono do arquivo
sudo chown usuario:grupo arquivo

# Ver permissões
ls -l
```

---

## Processos e Sistema

```bash
# Ver processos em tempo real
top
htop          # versão melhorada (instalar: sudo dnf install htop)

# Listar processos
ps aux

# Matar processo pelo PID
kill -9 PID

# Matar processo pelo nome
pkill nome-do-processo

# Ver uso de memória
free -h

# Ver informações da CPU
lscpu

# Ver hardware de forma geral
sudo lshw -short

# Ver temperatura (instalar: sudo dnf install lm_sensors)
sensors
```

---

## Serviços (systemd)

```bash
# Iniciar um serviço
sudo systemctl start nome-do-servico

# Parar um serviço
sudo systemctl stop nome-do-servico

# Reiniciar um serviço
sudo systemctl restart nome-do-servico

# Habilitar na inicialização
sudo systemctl enable nome-do-servico

# Desabilitar na inicialização
sudo systemctl disable nome-do-servico

# Ver status de um serviço
systemctl status nome-do-servico

# Ver todos os serviços ativos
systemctl list-units --type=service --state=running
```

---

## Rede

```bash
# Ver interfaces de rede e IPs
ip addr
ip a               # abreviado

# Testar conectividade
ping google.com
ping -c 4 google.com   # apenas 4 pacotes

# Ver rota de rede
ip route

# Ver portas em uso
ss -tuln

# DNS lookup
nslookup google.com
dig google.com

# Download de arquivo
wget https://url-do-arquivo.com/arquivo.zip
curl -O https://url-do-arquivo.com/arquivo.zip
```

---

## Firewall (firewalld)

```bash
# Ver status
sudo firewall-cmd --state

# Listar regras ativas
sudo firewall-cmd --list-all

# Abrir uma porta temporariamente
sudo firewall-cmd --add-port=8080/tcp

# Abrir uma porta permanentemente
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
```

---

## Logs do Sistema

```bash
# Ver logs em tempo real
sudo journalctl -f

# Logs do boot atual
sudo journalctl -b

# Logs de um serviço específico
sudo journalctl -u nome-do-servico -f

# Logs do kernel
sudo dmesg | tail -50
```

---

## Compressão e Arquivos

```bash
# Criar arquivo .tar.gz
tar -czf arquivo.tar.gz pasta/

# Extrair .tar.gz
tar -xzf arquivo.tar.gz

# Extrair em pasta específica
tar -xzf arquivo.tar.gz -C /destino/

# Compactar com zip
zip -r arquivo.zip pasta/

# Extrair zip
unzip arquivo.zip
```

---

## Usuários e Senhas

```bash
# Trocar senha do usuário atual
passwd

# Adicionar usuário
sudo useradd -m novo-usuario

# Adicionar usuário ao grupo sudo (wheel no Fedora)
sudo usermod -aG wheel novo-usuario

# Ver grupos do usuário atual
groups

# Trocar para outro usuário
su - nome-do-usuario
```

---

## Utilitários Úteis

```bash
# Buscar texto dentro de arquivos
grep -r "texto" /caminho/

# Buscar arquivos por nome
find / -name "arquivo.txt" 2>/dev/null

# Ver histórico de comandos
history

# Limpar terminal
clear

# Ver data e hora
date

# Ver tempo ligado da máquina
uptime

# Executar comando com privilégios de root
sudo comando

# Editar arquivo como root
sudo nano /etc/arquivo-de-config
sudo vim /etc/arquivo-de-config
```

---

## Atalhos do Terminal

| Atalho | Ação |
|--------|------|
| `Ctrl+C` | Cancelar comando em execução |
| `Ctrl+Z` | Suspender processo |
| `Ctrl+D` | Sair do terminal / fechar sessão |
| `Ctrl+L` | Limpar tela (igual ao `clear`) |
| `Tab` | Autocompletar comandos e caminhos |
| `↑ / ↓` | Navegar no histórico de comandos |
| `Ctrl+R` | Buscar no histórico de comandos |

---

## Apps Essenciais para Instalar no Fedora

```bash
# Ferramentas de desenvolvimento
sudo dnf install git curl wget vim htop

# Suporte a codecs de mídia
sudo dnf install ffmpeg --allowerasing

# RPM Fusion (repositório extra com drivers e softwares)
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# Driver NVIDIA (após RPM Fusion)
sudo dnf install akmod-nvidia

# Fontes Microsoft
sudo dnf install mscore-fonts
```

---

## Configurando Powerlevel10k + Oh My Zsh no Fedora

Tutorial completo para deixar o terminal bonito e funcional.

### 1. Instalar Zsh e Oh My Zsh

```bash
# Instalar Zsh
sudo dnf install -y zsh

# Definir Zsh como shell padrão
chsh -s $(which zsh)

# Instalar Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

> Faça logout e login para o Zsh virar o shell padrão.

### 2. Instalar a fonte MesloLGS NF

A fonte MesloLGS NF contém os ícones que o Powerlevel10k usa. Sem ela, os símbolos aparecem quebrados.

```bash
# Criar diretório de fontes
sudo mkdir -p /usr/local/share/fonts/m

# Baixar as 4 variantes
cd /tmp
wget https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf
wget https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf
wget https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf
wget https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf

# Mover para o diretório de fontes e atualizar cache
sudo mv MesloLGS*.ttf /usr/local/share/fonts/m/
sudo fc-cache -fv
```

Verificar instalacao:

```bash
fc-list | grep MesloLGS
```

### 3. Instalar Powerlevel10k

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

### 4. Instalar plugins essenciais

```bash
# Autosuggestions - sugere comandos enquanto digita (aceita com →)
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Syntax Highlighting - colore comandos (verde = válido, vermelho = erro)
git clone https://github.com/zsh-users/zsh-syntax-highlighting \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Completions - autocomplete extra para centenas de ferramentas
git clone https://github.com/zsh-users/zsh-completions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-completions
```

### 5. Configurar o ~/.zshrc

Edite o `~/.zshrc` e faça as seguintes alteracoes:

**No topo do arquivo** (antes de tudo), adicione o instant prompt:

```bash
# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi
```

**Altere o tema** de `robbyrussell` para:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

**Altere os plugins** para:

```bash
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  zsh-completions
  docker
  docker-compose
  kubectl
  npm
  sudo
  history
  dirhistory
  copypath
  copyfile
  web-search
  jsontools
  command-not-found
)
```

**No final do arquivo**, adicione:

```bash
# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
```

### 6. Gerar a configuracao do Powerlevel10k

Abra um novo terminal e o wizard do p10k vai iniciar automaticamente. Escolha suas preferencias.

Ou rode manualmente a qualquer momento:

```bash
p10k configure
```

Para usar um preset pronto sem o wizard:

```bash
# Opcoes: p10k-rainbow, p10k-classic, p10k-lean, p10k-pure
cp ~/.oh-my-zsh/custom/themes/powerlevel10k/config/p10k-rainbow.zsh ~/.p10k.zsh
```

### 7. Configurar a fonte no terminal do VS Code

O terminal do VS Code usa sua propria fonte. Sem configurar, os icones ficam quebrados.

Adicione no `settings.json` do VS Code (`Ctrl+Shift+P` > "Open User Settings JSON"):

```json
{
  "terminal.integrated.fontFamily": "MesloLGS NF"
}
```

> Para o terminal do GNOME: Preferencias > Perfil > Fonte personalizada > **MesloLGS NF Regular**

### 8. (Opcional) Fastfetch ao iniciar o terminal

Mostra as configuracoes da maquina ao abrir o terminal.

```bash
sudo dnf install -y fastfetch
```

Adicione no final do `~/.zshrc`:

```bash
fastfetch
```

---

### Resumo dos plugins built-in

| Plugin | O que faz | Exemplo |
|--------|-----------|---------|
| **git** | Aliases para git | `gst` (status), `gco` (checkout), `gp` (push) |
| **sudo** | Esc Esc adiciona sudo ao comando | Digite comando > Esc Esc > vira `sudo comando` |
| **history** | Atalhos para historico | `h` (historico), `hsi texto` (busca) |
| **dirhistory** | Navegar diretorios com Alt+setas | Alt+← (voltar), Alt+→ (avancar) |
| **copypath** | Copia o caminho atual | `copypath` copia para clipboard |
| **copyfile** | Copia conteudo de arquivo | `copyfile ~/.zshrc` |
| **web-search** | Busca no browser | `google termo`, `ddg termo` |
| **jsontools** | Ferramentas JSON | `cat x.json \| pp_json`, `echo texto \| urlencode` |
| **command-not-found** | Sugere pacote para instalar | Digita `htop` sem ter > sugere `sudo dnf install htop` |
| **docker** | Aliases docker | `dps` (ps), `dimg` (images) |
| **kubectl** | Autocomplete k8s | `k get pods` + Tab completa tudo |

