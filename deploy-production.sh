#!/bin/bash

# 🚀 VeteranSupport.ca Production Deployment Script
# This script deploys both the veteran and family apps to their respective domains

echo "🎖️ Starting VeteranSupport.ca Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Please install it first:"
    echo "npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "Not logged in to Vercel. Please login first:"
    vercel login
fi

print_status "Deploying Veteran Mental Health App to veteransupport.ca..."

# Deploy Veteran App
print_status "Building and deploying veteran app..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Veteran app build successful"
    
    # Deploy to Vercel with custom domain
    vercel --prod --alias veteransupport.ca
    
    if [ $? -eq 0 ]; then
        print_success "Veteran app deployed to https://veteransupport.ca"
    else
        print_error "Failed to deploy veteran app"
        exit 1
    fi
else
    print_error "Veteran app build failed"
    exit 1
fi

print_status "Deploying Family Support App to family.veteransupport.ca..."

# Navigate to family app directory
cd ../veteran-family-support

if [ ! -d "../veteran-family-support" ]; then
    print_error "Family support app directory not found"
    print_warning "Please ensure the family app is cloned at: ../veteran-family-support"
    exit 1
fi

# Deploy Family App
print_status "Building and deploying family app..."
npm install
npm run build

if [ $? -eq 0 ]; then
    print_success "Family app build successful"
    
    # Deploy to Vercel with custom subdomain
    vercel --prod --alias family.veteransupport.ca
    
    if [ $? -eq 0 ]; then
        print_success "Family app deployed to https://family.veteransupport.ca"
    else
        print_error "Failed to deploy family app"
        exit 1
    fi
else
    print_error "Family app build failed"
    exit 1
fi

# Return to original directory
cd ../veterans-mental-health

print_success "🎉 Deployment Complete!"
echo ""
echo "📱 Applications are now live:"
echo "   🎖️  Veteran App: https://veteransupport.ca"
echo "   👨‍👩‍👧‍👦 Family App:  https://family.veteransupport.ca"
echo ""
echo "🔗 Pitch Deck: https://veteransupport.ca/pitch-deck"
echo ""
echo "📞 Contact: Jeremy Brown"
echo "   📧 Email: jeremyjaybrown@gmail.com"
echo "   📱 Phone: +1 (647) 880-1210"
echo ""
print_status "Deployment logs and monitoring available in Vercel dashboard"
print_warning "Allow 24-48 hours for DNS propagation if using a new domain"

# Optional: Open apps in browser
read -p "Open applications in browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Opening applications..."
    
    # Check OS and open accordingly
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open https://veteransupport.ca
        open https://family.veteransupport.ca
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open https://veteransupport.ca
        xdg-open https://family.veteransupport.ca
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Windows
        start https://veteransupport.ca
        start https://family.veteransupport.ca
    fi
fi

print_success "🎖️ VeteranSupport.ca ecosystem is now live and ready for investors!"
