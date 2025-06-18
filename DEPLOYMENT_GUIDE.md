# 🚀 VeteranSupport.ca Deployment Guide

## 🌐 Domain & Subdomain Setup

### **Domain Structure:**
- **Main Veteran App**: `veteransupport.ca`
- **Family Support App**: `family.veteransupport.ca`

### **Repository Structure:**
- **Veteran App Repo**: `jahboukie/veterans-mental-health`
- **Family App Repo**: `jahboukie/veteran-family-support`

---

## 📋 Pre-Deployment Checklist

### **1. Domain Purchase & DNS Setup**
- [ ] Purchase `veteransupport.ca` domain
- [ ] Configure DNS records at your registrar:

```dns
# DNS Configuration
A     veteransupport.ca          → 76.76.19.61 (Vercel)
CNAME family.veteransupport.ca  → cname.vercel-dns.com
CNAME *.veteransupport.ca       → cname.vercel-dns.com (wildcard)
```

### **2. Supabase Setup**
- [ ] Create production Supabase project
- [ ] Configure database schema
- [ ] Set up Row Level Security (RLS)
- [ ] Generate production API keys

### **3. Environment Variables**
- [ ] Set up production environment variables in Vercel
- [ ] Configure Supabase credentials
- [ ] Set up API keys and endpoints

---

## 🔧 Veteran App Deployment (veteransupport.ca)

### **Step 1: Vercel Project Setup**
```bash
# Connect to Vercel
vercel login
vercel link

# Set project name
vercel --name veteransupport-canada
```

### **Step 2: Environment Variables**
Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```env
# Supabase (Production)
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key

# Domain Configuration
VITE_VETERAN_APP_URL=https://veteransupport.ca
VITE_FAMILY_APP_URL=https://family.veteransupport.ca

# Canadian Resources
VITE_VAC_CRISIS_LINE=1-800-268-7708
VITE_CRISIS_TEXT_LINE=838255
VITE_VAC_FAMILY_LINE=1-866-522-2122
VITE_OSISS_SUPPORT=1-800-883-6094

# Contact Information
VITE_SUPPORT_EMAIL=jeremyjaybrown@gmail.com
VITE_SUPPORT_PHONE=+1-647-880-1210

# Security
VITE_DEV_MODE=false
VITE_ENCRYPTION_ENABLED=true
VITE_HIPAA_LOGGING=true
```

### **Step 3: Custom Domain**
```bash
# Add custom domain
vercel domains add veteransupport.ca

# Deploy to production
vercel --prod --alias veteransupport.ca
```

---

## 👨‍👩‍👧‍👦 Family App Deployment (family.veteransupport.ca)

### **Step 1: Clone Family App Repository**
```bash
# Clone the family support app
git clone https://github.com/jahboukie/veteran-family-support.git
cd veteran-family-support
```

### **Step 2: Vercel Project Setup**
```bash
# Connect to Vercel (separate project)
vercel login
vercel link

# Set project name
vercel --name veteran-family-support
```

### **Step 3: Environment Variables**
Set these in Vercel Dashboard for the family app:

```env
# Supabase (Same as veteran app)
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key

# Cross-App Integration
VITE_VETERAN_APP_URL=https://veteransupport.ca
VITE_FAMILY_APP_URL=https://family.veteransupport.ca

# Canadian Family Resources
VITE_VAC_FAMILY_LINE=1-866-522-2122
VITE_OSISS_SUPPORT=1-800-883-6094
VITE_VAC_CRISIS_LINE=1-800-268-7708

# Contact Information
VITE_SUPPORT_EMAIL=jeremyjaybrown@gmail.com
VITE_SUPPORT_PHONE=+1-647-880-1210

# Security
VITE_DEV_MODE=false
VITE_ENCRYPTION_ENABLED=true
```

### **Step 4: Custom Subdomain**
```bash
# Add custom subdomain
vercel domains add family.veteransupport.ca

# Deploy to production
vercel --prod --alias family.veteransupport.ca
```

---

## 🔗 Cross-App Integration Setup

### **CORS Configuration**
Both apps need to allow cross-origin requests:

```json
// In vercel.json for both apps
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://veteransupport.ca, https://family.veteransupport.ca"
        }
      ]
    }
  ]
}
```

### **Shared Authentication Domain**
Configure both apps to use the same auth domain:
```javascript
// Supabase client configuration
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})
```

---

## 🧪 Testing Deployment

### **1. DNS Propagation Check**
```bash
# Check DNS propagation
nslookup veteransupport.ca
nslookup family.veteransupport.ca
```

### **2. SSL Certificate Verification**
- [ ] Visit `https://veteransupport.ca` - should show valid SSL
- [ ] Visit `https://family.veteransupport.ca` - should show valid SSL

### **3. Cross-App Communication Test**
- [ ] Test veteran app → family app links
- [ ] Test family app → veteran app links
- [ ] Verify shared authentication works

### **4. Demo Flow Verification**
- [ ] Test pitch deck demo links
- [ ] Verify investor demo scenarios work
- [ ] Check all contact information displays correctly

---

## 📊 Post-Deployment Monitoring

### **Analytics Setup**
- [ ] Configure Vercel Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Monitor performance metrics

### **Security Monitoring**
- [ ] SSL certificate auto-renewal
- [ ] Security headers verification
- [ ] CORS policy validation

### **Backup & Recovery**
- [ ] Database backup schedule
- [ ] Environment variable backup
- [ ] Deployment rollback plan

---

## 🆘 Troubleshooting

### **Common Issues:**

#### **DNS Not Resolving**
```bash
# Clear DNS cache
ipconfig /flushdns  # Windows
sudo dscacheutil -flushcache  # macOS
```

#### **SSL Certificate Issues**
- Wait 24-48 hours for DNS propagation
- Check Vercel domain settings
- Verify DNS records are correct

#### **Cross-App Communication Failing**
- Check CORS headers in vercel.json
- Verify environment variables
- Test API endpoints individually

---

## 📞 Support

**Jeremy Brown** - Project Lead
- **Email**: jeremyjaybrown@gmail.com
- **Phone**: +1 (647) 880-1210

**Technical Issues**:
- GitHub Issues: [veterans-mental-health](https://github.com/jahboukie/veterans-mental-health/issues)
- GitHub Issues: [veteran-family-support](https://github.com/jahboukie/veteran-family-support/issues)

---

## 🎯 Success Criteria

✅ **Deployment Complete When:**
- [ ] `veteransupport.ca` loads veteran app successfully
- [ ] `family.veteransupport.ca` loads family app successfully
- [ ] Both apps have valid SSL certificates
- [ ] Cross-app navigation works seamlessly
- [ ] Pitch deck demo links function correctly
- [ ] Contact information displays properly
- [ ] All security headers are active

**🎖️ Ready for investor presentations and government partnerships!**
