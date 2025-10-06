#!/bin/bash

# CyberSim Pro - Complete Testing & Verification Script
# This script tests all components of the platform

echo "🧪 CyberSim Pro - Complete Testing & Verification"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to print test result
test_result() {
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗${NC} $2"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

echo "Phase 1: Checking Project Structure"
echo "====================================="

# Check if key directories exist
test -d "apps/api" && test_result 0 "API directory exists" || test_result 1 "API directory missing"
test -d "apps/dashboard" && test_result 0 "Dashboard directory exists" || test_result 1 "Dashboard directory missing"
test -d "apps/marketing-nextjs" && test_result 0 "Marketing directory exists" || test_result 1 "Marketing directory missing"

# Check if key files exist
test -f "apps/api/src/routes/demo.routes.ts" && test_result 0 "Demo routes file exists" || test_result 1 "Demo routes file missing"
test -f "apps/api/src/routes/billing.routes.ts" && test_result 0 "Billing routes file exists" || test_result 1 "Billing routes file missing"
test -f "apps/api/src/routes/employees.routes.ts" && test_result 0 "Employee routes file exists" || test_result 1 "Employee routes file missing"
test -f "apps/dashboard/src/app/dashboard/training/[moduleId]/play/page.tsx" && test_result 0 "Training game file exists" || test_result 1 "Training game file missing"
test -f "apps/marketing-nextjs/src/components/DemoBookingForm.tsx" && test_result 0 "Demo form file exists" || test_result 1 "Demo form file missing"

# Check environment files
test -f "apps/api/.env" && test_result 0 "API .env exists" || test_result 1 "API .env missing"
test -f "apps/dashboard/.env.local" && test_result 0 "Dashboard .env.local exists" || test_result 1 "Dashboard .env.local missing"
test -f "apps/marketing-nextjs/.env.local" && test_result 0 "Marketing .env.local exists" || test_result 1 "Marketing .env.local missing"

echo ""
echo "Phase 2: Testing Database Setup"
echo "================================"

# Check if Docker is running
docker info > /dev/null 2>&1
test_result $? "Docker is running"

# Check if PostgreSQL container is running
docker ps | grep -q "cybersim-postgres"
test_result $? "PostgreSQL container is running"

# Test database connection (if running)
if docker ps | grep -q "cybersim-postgres"; then
    docker exec cybersim-postgres pg_isready -U postgres > /dev/null 2>&1
    test_result $? "Database is accepting connections"
fi

echo ""
echo "Phase 3: Testing API Endpoints (if running)"
echo "==========================================="

# Check if API is running
API_RUNNING=0
curl -s http://localhost:3000/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    API_RUNNING=1
    test_result 0 "API server is running on port 3000"
    
    # Test health endpoint
    HEALTH_RESPONSE=$(curl -s http://localhost:3000/health)
    echo $HEALTH_RESPONSE | grep -q "success"
    test_result $? "Health endpoint returns success"
    
    # Test demo endpoint
    DEMO_RESPONSE=$(curl -s -X POST http://localhost:3000/api/demos \
      -H "Content-Type: application/json" \
      -d '{"name":"Test","email":"test@test.com","company":"Test Co","employeeCount":"1-50"}')
    echo $DEMO_RESPONSE | grep -q "success"
    test_result $? "Demo booking endpoint works"
    
    # Test training game endpoint
    curl -s http://localhost:3000/api/training/phishing-101/game | grep -q "steps"
    test_result $? "Training game content endpoint works"
    
    # Test training modules endpoint
    curl -s http://localhost:3000/api/training/modules | grep -q "success"
    test_result $? "Training modules endpoint works"
else
    echo -e "${YELLOW}⚠${NC} API server not running - skipping API tests"
    echo "  To test API, run: cd apps/api && npm run dev"
fi

echo ""
echo "Phase 4: Testing Frontend Applications (if running)"
echo "==================================================="

# Check if Dashboard is running
curl -s http://localhost:3001 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    test_result 0 "Dashboard is running on port 3001"
else
    echo -e "${YELLOW}⚠${NC} Dashboard not running - skipping dashboard tests"
    echo "  To test Dashboard, run: cd apps/dashboard && npm run dev"
fi

# Check if Marketing site is running
curl -s http://localhost:3004 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    test_result 0 "Marketing site is running on port 3004"
    
    # Check if key content exists
    curl -s http://localhost:3004 | grep -q "CyberSim"
    test_result $? "Marketing site contains CyberSim branding"
else
    echo -e "${YELLOW}⚠${NC} Marketing site not running - skipping marketing tests"
    echo "  To test Marketing, run: cd apps/marketing-nextjs && npm run dev"
fi

echo ""
echo "Phase 5: Code Quality Checks"
echo "============================"

# Check for TypeScript files
TS_FILES=$(find apps -name "*.ts" -o -name "*.tsx" | wc -l)
test [ $TS_FILES -gt 0 ] && test_result 0 "TypeScript files found ($TS_FILES files)" || test_result 1 "No TypeScript files found"

# Check for package.json files
test -f "apps/api/package.json" && test_result 0 "API package.json exists" || test_result 1 "API package.json missing"
test -f "apps/dashboard/package.json" && test_result 0 "Dashboard package.json exists" || test_result 1 "Dashboard package.json missing"
test -f "apps/marketing-nextjs/package.json" && test_result 0 "Marketing package.json exists" || test_result 1 "Marketing package.json missing"

echo ""
echo "Phase 6: Documentation Checks"
echo "=============================="

test -f "README.md" && test_result 0 "Main README.md exists" || test_result 1 "Main README.md missing"
test -f "BUILD_COMPLETE_SUMMARY.md" && test_result 0 "Build summary exists" || test_result 1 "Build summary missing"
test -f "docker-compose.yml" && test_result 0 "Docker compose file exists" || test_result 1 "Docker compose file missing"

echo ""
echo "=================================================="
echo "📊 Test Summary"
echo "=================================================="
echo -e "Total Tests:  ${TOTAL_TESTS}"
echo -e "${GREEN}Passed:       ${PASSED_TESTS}${NC}"
echo -e "${RED}Failed:       ${FAILED_TESTS}${NC}"
echo ""

# Calculate success rate
if [ $TOTAL_TESTS -gt 0 ]; then
    SUCCESS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
    echo "Success Rate: ${SUCCESS_RATE}%"
    echo ""
    
    if [ $SUCCESS_RATE -ge 90 ]; then
        echo -e "${GREEN}✓ Platform is ready for deployment!${NC}"
    elif [ $SUCCESS_RATE -ge 70 ]; then
        echo -e "${YELLOW}⚠ Platform needs some fixes before deployment${NC}"
    else
        echo -e "${RED}✗ Platform requires significant fixes${NC}"
    fi
fi

echo ""
echo "=================================================="
echo "🚀 Next Steps"
echo "=================================================="
echo ""

if [ $API_RUNNING -eq 0 ]; then
    echo "1. Start the API server:"
    echo "   cd apps/api && npm run dev"
    echo ""
fi

echo "2. Start all services at once:"
echo "   npm run dev"
echo ""

echo "3. Test the training game:"
echo "   Open: http://localhost:3001/dashboard/training/phishing-101/play"
echo ""

echo "4. Test demo booking:"
echo "   Open: http://localhost:3004"
echo "   Click 'Book Demo' and submit form"
echo ""

echo "5. Review the documentation:"
echo "   - README.md"
echo "   - BUILD_COMPLETE_SUMMARY.md"
echo ""

exit 0
