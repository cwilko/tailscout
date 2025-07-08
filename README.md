# Tailscout - Professional Dog Search & Rescue Website

A modern, responsive website for Tailscout's emergency dog search and rescue services.

## Features

- **Emergency-First Design**: Prominent contact information and urgent call-to-action
- **Modern 2025 Design**: Soothing color palette, bold blocks, and smooth animations
- **Technology Showcase**: Highlights advanced search equipment (drones, thermal imaging, GPS)
- **Success Stories**: Real testimonials and rescue case studies
- **Dark Mode**: Toggle between light and dark themes
- **Fully Responsive**: Optimized for all devices, especially mobile emergency situations
- **Performance Optimized**: Fast loading with caching and compression

## Apache Deployment

### Installation
```bash
# Install Apache
sudo apt install apache2  # Ubuntu/Debian
sudo yum install httpd    # CentOS/RHEL

# Copy files to web root
sudo cp -r * /var/www/html/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/

# Restart Apache
sudo systemctl restart apache2  # Ubuntu/Debian
sudo systemctl restart httpd    # CentOS/RHEL
```

### Required Apache Modules
```bash
# Enable required modules
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate
sudo systemctl restart apache2
```

## File Structure
```
tailscout/
├── index.html      # Main website
├── styles.css      # CSS styles and animations
├── script.js       # Interactive JavaScript
├── .htaccess       # Apache configuration
├── 404.html        # Custom 404 error page
└── README.md       # Documentation
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features
- Gzip compression
- Static asset caching
- Optimized images
- Minimal JavaScript bundle
- CSS/JS minification ready

## Security Features
- CSP headers
- XSS protection
- MIME type sniffing protection
- Clickjacking protection
- Hidden dot files

## Contact Information
- **Emergency**: 1-855-TAILSCOUT
- **Website**: Generated with modern web standards
- **Technology**: HTML5, CSS3, Vanilla JavaScript

---
*Professional dog search and rescue services with cutting-edge technology.*