# 🔒 SECURITY SETUP - Veterans Mental Health Platform

## 🚨 SECURITY FIRST FOR VETERANS

### 1. **API KEY SECURITY**

**Protect all API keys with military-grade security:**

#### Supabase Keys:
1. Go to: https://supabase.com/dashboard/project/xnxovbqqpdrmjzufevhe/settings/api
2. Securely store your keys:
   - `anon` key
   - `service_role` key
3. Update your `.env` file with the keys

#### Anthropic API Key:
1. Go to: https://console.anthropic.com/settings/keys
2. Generate a secure API key for Alex AI companion
3. Store securely in your `.env` file
4. Never share or commit API keys

### 2. **SET UP SUPABASE DATABASE**

1. **Run the Schema:**
   - Open Supabase SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Execute the script

2. **Configure Authentication:**
   - Go to Authentication > Settings
   - Enable email confirmation
   - Set up email templates for veterans
   - Configure password requirements

3. **Set up Row Level Security:**
   - The schema automatically enables RLS
   - Verify policies are active in the dashboard

### 3. **ENVIRONMENT VARIABLES SETUP**

Update your `.env` file with your secure keys:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xnxovbqqpdrmjzufevhe.supabase.co
VITE_SUPABASE_ANON_KEY=your_secure_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_secure_service_role_key_here

# Anthropic AI Configuration
VITE_ANTHROPIC_API_KEY=your_secure_anthropic_key_here
VITE_AI_MODEL=claude-3-5-sonnet-20241022
VITE_AI_TEMPERATURE=0.7
VITE_AI_MAX_TOKENS=1000
```

### 4. **SECURITY VERIFICATION CHECKLIST**

- [ ] All API keys securely generated and stored
- [ ] `.env` file updated with new keys
- [ ] `.env` file is in `.gitignore` (✅ Already done)
- [ ] Supabase database schema deployed
- [ ] Row Level Security enabled
- [ ] Authentication configured
- [ ] No sensitive data in git history

### 5. **ADDITIONAL SECURITY MEASURES**

#### For Production:
1. **Environment Variables:**
   - Use Vercel/Netlify environment variables
   - Never store keys in code or config files

2. **Supabase Security:**
   - Enable 2FA on Supabase account
   - Set up database backups
   - Monitor API usage

3. **Code Security:**
   - Regular dependency updates
   - Security scanning
   - Code reviews

#### For Development:
1. **Local Security:**
   - Use different keys for dev/prod
   - Regular key rotation
   - Secure local storage

### 6. **CRISIS INTERVENTION SECURITY**

For veterans mental health, extra security is critical:

1. **Data Encryption:**
   - All sensitive data encrypted at rest
   - End-to-end encryption for messages
   - Zero-knowledge architecture

2. **Privacy Protection:**
   - Anonymous mode by default
   - No data sharing without consent
   - HIPAA-compliant practices

3. **Crisis Detection:**
   - Secure crisis event logging
   - Encrypted emergency contact data
   - Audit trails for all crisis interventions

### 7. **MONITORING & ALERTS**

Set up monitoring for:
- Unusual API usage patterns
- Failed authentication attempts
- Crisis event triggers
- Database access patterns

## 🆘 SECURITY INCIDENT RESPONSE:

1. **Immediately revoke all keys**
2. **Check git history for exposed secrets**
3. **Rotate all credentials**
4. **Review access logs**
5. **Update all deployment environments**

## 📞 EMERGENCY CONTACTS

- **Technical Issues:** team.mobileweb@gmail.com
- **Security Incidents:** Immediately revoke keys and contact support
- **Veterans Crisis:** 988 (Press 1) - Available 24/7

---

**Remember: Veterans trust us with their most sensitive mental health data. Security is not optional - it's a sacred responsibility.**
