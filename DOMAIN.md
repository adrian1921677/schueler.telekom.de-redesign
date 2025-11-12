# Domain-Konfiguration

## Projekt-Informationen

**Projektname:** Telekom Azubi/Studis ReDesign  
**Syno-Link:** telekom azubi login  
**Domain:** telekom.abdullahu-adrian.de

## Domain-Setup

### Vercel Domain-Konfiguration

1. **Domain zu Vercel hinzufügen:**
   - Gehen Sie zu Ihrem Vercel-Dashboard
   - Wählen Sie das Projekt "schueler.telekom.de-redesign"
   - Navigieren Sie zu Settings → Domains
   - Fügen Sie die Domain hinzu: `telekom.abdullahu-adrian.de`

2. **DNS-Konfiguration:**
   - Erstellen Sie einen CNAME-Record bei Ihrem DNS-Provider:
     ```
     Name: telekom
     Type: CNAME
     Value: cname.vercel-dns.com
     ```

### Synology NAS Konfiguration

Falls Sie eine Synology NAS verwenden:

1. **Reverse Proxy einrichten:**
   - Gehen Sie zu Control Panel → Application Portal → Reverse Proxy
   - Erstellen Sie eine neue Regel:
     - **Beschreibung:** Telekom Azubi Login
     - **Quelle:**
       - Protokoll: HTTPS
       - Hostname: telekom.abdullahu-adrian.de
       - Port: 443
     - **Ziel:**
       - Protokoll: HTTPS
       - Hostname: schueler-telekom-de-redesign.vercel.app
       - Port: 443

2. **SSL-Zertifikat:**
   - Stellen Sie sicher, dass ein SSL-Zertifikat für die Domain konfiguriert ist
   - Sie können Let's Encrypt über Synology verwenden

## Aktuelle URLs

- **Vercel:** https://schueler-telekom-de-redesign.vercel.app
- **Custom Domain:** https://telekom.abdullahu-adrian.de (nach DNS-Konfiguration)

## GitHub Repository

https://github.com/adrian1921677/schueler.telekom.de-redesign.git

