// Billing Dashboard JavaScript

// Mobile Navigation Toggle (if needed)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Sidebar Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to sidebar items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            document.querySelectorAll('.sidebar-item').forEach(sidebarItem => {
                sidebarItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            item.classList.add('active');
        });
    });
    
    // New Sale Button
    const newSaleBtn = document.querySelector('.new-sale-btn');
    if (newSaleBtn) {
        newSaleBtn.addEventListener('click', () => {
            alert('New Sale functionality would open here');
        });
    }
    
    // New Transaction Button
    const newTransactionBtn = document.querySelector('.new-transaction-btn');
    if (newTransactionBtn) {
        newTransactionBtn.addEventListener('click', () => {
            alert('New Transaction functionality would open here');
        });
    }
    
    // Action Buttons (Filter and Search)
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.textContent.trim();
            alert(`${action} functionality would open here`);
        });
    });
    
    // Prompt Buttons
    document.querySelectorAll('.prompt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prompt = btn.textContent.trim();
            addUserMessage(prompt);
        });
    });
    
    // Send Button
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input');
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => {
            sendMessage();
        });
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // View All Link
    const viewAllLink = document.querySelector('.view-all');
    if (viewAllLink) {
        viewAllLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('View All Transactions functionality would open here');
        });
    }
    
    // Transaction Items
    document.querySelectorAll('.transaction-item').forEach(item => {
        item.addEventListener('click', () => {
            const clientName = item.querySelector('.client-name').textContent;
            const transactionId = item.querySelector('.transaction-details').textContent.split('•')[1].trim();
            alert(`Viewing details for ${clientName} - ${transactionId}`);
        });
    });
    
    // Action Buttons in Insight Cards
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = button.textContent.trim();
            const card = button.closest('.insight-card');
            const title = card.querySelector('h3').textContent;
            
            // Simulate action taken
            button.textContent = 'Processing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Completed';
                button.style.backgroundColor = '#10b981';
                button.style.borderColor = '#10b981';
                button.style.color = 'white';
                card.style.opacity = '0.7';
                
                // Show success message
                setTimeout(() => {
                    alert(`${action} completed for: ${title}`);
                }, 500);
            }, 2000);
        });
    });
    
    // Insight Cards Click
    document.querySelectorAll('.insight-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            alert(`Opening detailed view for: ${title}\n\n${description}`);
        });
    });
    
    // Workflow Actions
    document.querySelectorAll('.workflow-actions .action-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = button.textContent.trim();
            
            if (action === 'View Detailed Report') {
                alert('Opening detailed workflow analysis report showing:\n\n• Specific CPT code errors\n• Provider training recommendations\n• Revenue impact analysis\n• Corrective action plans');
            } else if (action === 'Set Up Alerts') {
                alert('Setting up automated alerts for:\n\n• Common billing mistakes\n• Real-time validation\n• Provider notifications\n• Quality assurance checks');
            }
        });
    });
    
    // Mistake Items Click
    document.querySelectorAll('.mistake-item').forEach(item => {
        item.addEventListener('click', () => {
            const mistakeType = item.querySelector('.mistake-type').textContent;
            const mistakeDetails = item.querySelector('.mistake-details').textContent;
            const mistakeImpact = item.querySelector('.mistake-impact').textContent;
            
            // Open workflow modal for chiropractic treatment codes
            if (mistakeType === 'Chiropractic Treatment Codes') {
                openWorkflowModal();
            } else {
                alert(`Mistake Details: ${mistakeType}\n\n${mistakeDetails}\n\nImpact: ${mistakeImpact}\n\nWould you like to see corrective actions?`);
            }
        });
    });
});

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

// Assistant Toggle
function toggleAssistant() {
    const assistantPanel = document.getElementById('assistantPanel');
    assistantPanel.classList.toggle('open');
}

// Revenue Time Control
const revenueTimeframeData = {
    '1D': { value: '$2,450.00', change: '+12% from yesterday', changeType: 'positive', title: 'Today\'s Revenue' },
    '1W': { value: '$18,750.00', change: '+15% from last week', changeType: 'positive', title: 'This Week\'s Revenue' },
    '1M': { value: '$67,890.00', change: '+8% from last month', changeType: 'positive', title: '1 Month Revenue' },
    '3M': { value: '$198,450.00', change: '+15% from last quarter', changeType: 'positive', title: '3 Month Revenue' },
    'YTD': { value: '$387,920.00', change: '+22% from last year', changeType: 'positive', title: 'Year to Date Revenue' },
    '1Y': { value: '$756,340.00', change: '+18% from last year', changeType: 'positive', title: '1 Year Revenue' },
    'ALL': { value: '$1,234,567.00', change: '+25% total growth', changeType: 'positive', title: 'All Time Revenue' }
};

function updateRevenue(timeframe) {
    const data = revenueTimeframeData[timeframe];
    
    // Update revenue metric only
    const titleElement = document.getElementById('revenue-title');
    const valueElement = document.getElementById('revenue-value');
    const changeElement = document.getElementById('revenue-change');
    
    titleElement.textContent = data.title;
    valueElement.textContent = data.value;
    changeElement.textContent = data.change;
    changeElement.className = `metric-change ${data.changeType}`;
    
    // Add animation
    valueElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        valueElement.style.transform = 'scale(1)';
    }, 150);
}

// Initialize revenue dropdown
document.addEventListener('DOMContentLoaded', function() {
    const timeframeSelect = document.getElementById('timeframeSelect');
    
    timeframeSelect.addEventListener('change', function() {
        const timeframe = this.value;
        updateRevenue(timeframe);
    });
    
    // Initialize role selector
    const roleSelect = document.getElementById('roleSelect');
    
    roleSelect.addEventListener('change', function() {
        const selectedRole = this.value;
        handleRoleChange(selectedRole);
    });
    
    // Initialize with default role (biller)
    const currentRole = getCurrentRole();
    updateActionItemsForRole(currentRole);
});

// Role Management
function handleRoleChange(role) {
    console.log('Role changed to:', role);
    
    // Store current role for future use
    localStorage.setItem('currentRole', role);
    
    // Update UI based on role (placeholder for now)
    updateUIForRole(role);
}

function updateUIForRole(role) {
    console.log(`UI updated for role: ${role}`);
    
    // Show/hide revenue information based on role
    const revenueCard = document.querySelector('.revenue-card');
    const metricsGrid = document.querySelector('.metrics-grid');
    
    if (role === 'practitioner') {
        // Hide revenue card for practitioners
        if (revenueCard) {
            revenueCard.style.display = 'none';
        }
        
        // Update metrics grid to 3 columns instead of 4
        if (metricsGrid) {
            metricsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
        
        // Update action items for practitioners
        updateActionItemsForRole(role);
    } else {
        // Show revenue card for all other roles
        if (revenueCard) {
            revenueCard.style.display = 'block';
        }
        
        // Reset metrics grid to 4 columns
        if (metricsGrid) {
            metricsGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
        
        // Update action items for other roles
        updateActionItemsForRole(role);
    }
}

// Original action items (for non-practitioner roles)
const originalActionItems = [
    {
        type: 'urgent',
        title: '12 Claims Need Immediate Attention',
        description: 'Claims approaching 30-day deadline with missing documentation',
        impact: 'High Priority'
    },
    {
        type: 'warning',
        title: '6 Denials Require Appeal',
        description: 'Appeal deadline expires in 2 days for $2,340 in revenue',
        impact: '$2,340 at risk'
    },
    {
        type: 'info',
        title: 'Revenue Recovery Potential',
        description: '$8,500 in underbilled services identified this week',
        impact: '$8,500 potential'
    },
    {
        type: 'urgent',
        title: 'Insurance Verification',
        description: '15 patients have outdated insurance information that needs immediate updating',
        impact: '15 patients'
    },
    {
        type: 'warning',
        title: 'Prior Authorization',
        description: '8 procedures require prior authorization before they can be performed next week',
        impact: '8 procedures'
    },
    {
        type: 'info',
        title: 'Payment Follow-up',
        description: '31 outstanding payments totaling $45,670 need follow-up calls this week',
        impact: '$45,670 pending'
    },
    {
        type: 'urgent',
        title: 'Compliance Review',
        description: 'Monthly compliance audit reveals 5 billing practices that need immediate correction',
        impact: '5 practices'
    },
    {
        type: 'warning',
        title: 'Denial Analysis',
        description: 'Pattern detected: 40% of claims from Dr. Smith are being denied for coding errors',
        impact: '40% denial rate'
    }
];

// Practitioner-specific action items
const practitionerActionItems = [
    {
        type: 'urgent',
        title: 'Missing Billing Codes',
        description: '12 appointments from this week are missing required billing codes',
        impact: '12 appointments'
    },
    {
        type: 'warning',
        title: 'Incomplete Documentation',
        description: '8 patient visits need additional documentation for billing',
        impact: '8 visits'
    },
    {
        type: 'info',
        title: 'Procedure Authorization',
        description: '3 procedures scheduled next week require prior authorization',
        impact: '3 procedures'
    },
    {
        type: 'urgent',
        title: 'Insurance Verification',
        description: '5 patients have outdated insurance information',
        impact: '5 patients'
    },
    {
        type: 'warning',
        title: 'Billing Notes Required',
        description: '6 appointments need additional billing notes for proper coding',
        impact: '6 appointments'
    },
    {
        type: 'info',
        title: 'Treatment Plan Updates',
        description: '4 treatment plans need updates for accurate billing',
        impact: '4 plans'
    }
];

// Admin-specific action items (patient and billing information focused)
const adminActionItems = [
    {
        type: 'urgent',
        title: 'Patient Data Incomplete',
        description: '23 patient records are missing required demographic information',
        impact: '23 records'
    },
    {
        type: 'warning',
        title: 'Insurance Updates Needed',
        description: '18 patients have outdated insurance information requiring verification',
        impact: '18 patients'
    },
    {
        type: 'info',
        title: 'Billing Setup Pending',
        description: '7 new patients need billing account setup and payment method configuration',
        impact: '7 patients'
    },
    {
        type: 'urgent',
        title: 'Documentation Gaps',
        description: '15 patient files are missing required billing documentation',
        impact: '15 files'
    },
    {
        type: 'warning',
        title: 'Provider Assignment',
        description: '12 appointments need provider assignment for proper billing attribution',
        impact: '12 appointments'
    },
    {
        type: 'info',
        title: 'Billing Preferences',
        description: '9 patients need billing preference updates (paper vs electronic)',
        impact: '9 patients'
    },
    {
        type: 'urgent',
        title: 'Data Validation Errors',
        description: '6 patient records have data validation errors preventing billing',
        impact: '6 records'
    },
    {
        type: 'warning',
        title: 'Billing Contact Updates',
        description: '11 patients need emergency contact and billing contact information updates',
        impact: '11 patients'
    }
];

// Update action items based on role
function updateActionItemsForRole(role) {
    let roleSpecificItems = [];
    
    if (role === 'practitioner') {
        // Practitioner-specific action items (billing-related only)
        roleSpecificItems = [...practitionerActionItems];
    } else if (role === 'admin') {
        // Admin-specific action items (patient and billing information focused)
        roleSpecificItems = [...adminActionItems];
    } else {
        // All other roles (super-user, biller, owner) see the original action items
        roleSpecificItems = [...originalActionItems];
    }
    
    // Update the action items data
    actionItems.length = 0;
    actionItems.push(...roleSpecificItems);
    
    // Update the insights count
    const insightCount = document.getElementById('insightCount');
    if (insightCount) {
        insightCount.textContent = roleSpecificItems.length;
    }
    
    // Re-render if the insights section is expanded
    const insightsDetails = document.getElementById('insightsDetails');
    if (insightsDetails && insightsDetails.classList.contains('expanded')) {
        initializeActionItems();
    }
}

function getCurrentRole() {
    return localStorage.getItem('currentRole') || 'biller';
}

// Modal Functions
function handleActionItemClick(title, index) {
    console.log('Action item clicked:', title, index);
    
    // Handle specific action items
    if (title === '12 Claims Need Immediate Attention') {
        openClaimsModal();
    } else if (title === '6 Denials Require Appeal') {
        openDenialsModal();
    } else if (title === 'Revenue Recovery Potential') {
        openRevenueModal();
    } else {
        // For other items, show a simple alert (can be expanded later)
        alert(`Clicked on: ${title}\nThis would open a detailed view for this action item.`);
    }
}

function openClaimsModal() {
    const modal = document.getElementById('claimsModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Reset filter to show all claims when modal opens
    filterClaims('all');
}

function closeClaimsModal() {
    const modal = document.getElementById('claimsModal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Revenue Recovery Modal Functions
function openRevenueModal() {
    const modal = document.getElementById('revenueModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Reset filter to show all opportunities when modal opens
    filterRevenue('all');
    updateRevenueSelectedCount();
}

function closeRevenueModal() {
    const modal = document.getElementById('revenueModal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Revenue filtering functionality
let currentRevenueFilter = 'all'; // 'all', 'high', 'medium', 'low'

function filterRevenue(filterType) {
    currentRevenueFilter = filterType;
    const opportunityItems = document.querySelectorAll('.opportunity-item');
    const highCard = document.querySelector('#revenueModal .stat-item.high-value');
    const mediumCard = document.querySelector('#revenueModal .stat-item.medium-value');
    const lowCard = document.querySelector('#revenueModal .stat-item.low-value');
    const allCard = document.querySelector('#revenueModal .stat-item.total-value');
    
    // Update visual feedback for filter cards
    [highCard, mediumCard, lowCard, allCard].forEach(card => {
        if (card) {
            card.classList.remove('active');
        }
    });
    
    if (filterType === 'high' && highCard) {
        highCard.classList.add('active');
    } else if (filterType === 'medium' && mediumCard) {
        mediumCard.classList.add('active');
    } else if (filterType === 'low' && lowCard) {
        lowCard.classList.add('active');
    } else if (filterType === 'all' && allCard) {
        allCard.classList.add('active');
    }
    
    // Filter opportunity items
    opportunityItems.forEach(item => {
        if (filterType === 'all') {
            item.style.display = 'flex';
        } else if (filterType === 'high') {
            item.style.display = item.classList.contains('high-value') ? 'flex' : 'none';
        } else if (filterType === 'medium') {
            item.style.display = item.classList.contains('medium-value') ? 'flex' : 'none';
        } else if (filterType === 'low') {
            item.style.display = item.classList.contains('low-value') ? 'flex' : 'none';
        }
    });
    
    // Update the modal title to reflect the filter
    const modalTitle = document.querySelector('#revenueModal .modal-title h2');
    const modalSubtitle = document.querySelector('#revenueModal .modal-title p');
    
    if (filterType === 'all') {
        modalTitle.textContent = 'Revenue Recovery Potential';
        modalSubtitle.textContent = '$8,500 in underbilled services identified this week • Multiple recovery opportunities available';
    } else if (filterType === 'high') {
        modalTitle.textContent = 'High Value Recovery Opportunities';
        modalSubtitle.textContent = '$4,200 in high-value opportunities ($500+) • Focus on maximum revenue impact';
    } else if (filterType === 'medium') {
        modalTitle.textContent = 'Medium Value Recovery Opportunities';
        modalSubtitle.textContent = '$2,800 in medium-value opportunities ($200-499) • Good revenue potential';
    } else if (filterType === 'low') {
        modalTitle.textContent = 'Low Value Recovery Opportunities';
        modalSubtitle.textContent = '$1,500 in low-value opportunities ($50-199) • Quick wins available';
    }
}

function clearRevenueFilters() {
    filterRevenue('all');
}

// Revenue recovery functions
function processRecovery(opportunityId) {
    console.log('Processing recovery for opportunity:', opportunityId);
    
    // Find the opportunity item
    const opportunityItem = document.querySelector(`[data-opportunity-id="${opportunityId}"]`).closest('.opportunity-item');
    const recoverBtn = opportunityItem.querySelector('.action-btn.primary');
    
    // Update button state
    recoverBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    recoverBtn.disabled = true;
    
    // Simulate recovery processing
    setTimeout(() => {
        recoverBtn.innerHTML = '<i class="fas fa-check"></i> Recovered';
        recoverBtn.style.backgroundColor = '#10b981';
        recoverBtn.style.borderColor = '#10b981';
        
        // Update opportunity status
        const categoryBadge = opportunityItem.querySelector('.opportunity-category');
        categoryBadge.textContent = 'Recovered';
        categoryBadge.className = 'opportunity-category recovered';
        categoryBadge.style.backgroundColor = '#d1fae5';
        categoryBadge.style.color = '#065f46';
        
        // Show success message
        setTimeout(() => {
            alert(`Revenue opportunity ${opportunityId} has been successfully processed and the corrected billing has been submitted.`);
        }, 500);
    }, 2000);
}

function viewRecoveryDetails(opportunityId) {
    console.log('Viewing details for opportunity:', opportunityId);
    
    // Simulate opening detailed view
    alert(`Opening detailed view for Revenue Opportunity ${opportunityId}:\n\n• Complete billing analysis\n• CPT code comparison\n• Documentation review\n• Recovery timeline and status\n• Related claims and procedures\n• Provider notes and recommendations`);
}

function bulkRecovery() {
    const selectedOpportunities = document.querySelectorAll('.opportunity-check:checked');
    
    if (selectedOpportunities.length === 0) {
        alert('Please select at least one revenue opportunity to process.');
        return;
    }
    
    const totalValue = Array.from(selectedOpportunities).reduce((sum, checkbox) => {
        const amount = checkbox.closest('.opportunity-item').querySelector('.recovery-amount').textContent;
        return sum + parseFloat(amount.replace('$', '').replace(',', ''));
    }, 0);
    
    const confirmation = confirm(`Are you sure you want to process ${selectedOpportunities.length} selected opportunities worth $${totalValue.toLocaleString()}? This will submit corrected billing for all selected items.`);
    
    if (confirmation) {
        // Process each selected opportunity
        selectedOpportunities.forEach(checkbox => {
            const opportunityId = checkbox.getAttribute('data-opportunity-id');
            processRecovery(opportunityId);
        });
        
        // Update selected count
        updateRevenueSelectedCount();
    }
}

function exportRevenueOpportunities() {
    const selectedOpportunities = document.querySelectorAll('.opportunity-check:checked');
    
    if (selectedOpportunities.length === 0) {
        alert('Please select at least one revenue opportunity to export.');
        return;
    }
    
    // Simulate export functionality
    alert(`Exporting ${selectedOpportunities.length} selected revenue opportunities:\n\n• Opportunity details and analysis\n• Patient information\n• Recovery strategies\n• Billing corrections\n• Revenue impact analysis\n• Provider recommendations\n\nExport will be downloaded as a comprehensive PDF report.`);
}

function updateRevenueSelectedCount() {
    const selectedOpportunities = document.querySelectorAll('.opportunity-check:checked');
    const selectedCount = document.querySelector('#revenueModal .selected-count');
    const totalPotential = document.querySelector('#revenueModal .total-potential');
    
    if (selectedCount) {
        selectedCount.textContent = `${selectedOpportunities.length} selected`;
    }
    
    if (totalPotential) {
        const totalValue = Array.from(selectedOpportunities).reduce((sum, checkbox) => {
            const amount = checkbox.closest('.opportunity-item').querySelector('.recovery-amount').textContent;
            return sum + parseFloat(amount.replace('$', '').replace(',', ''));
        }, 0);
        
        totalPotential.textContent = `Total Potential: $${totalValue.toLocaleString()}`;
    }
}

// Workflow Analysis Modal Functions
function openWorkflowModal() {
    const modal = document.getElementById('workflowModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Reset filter to show all cases when modal opens
    filterWorkflow('all');
    updateWorkflowSelectedCount();
}

function closeWorkflowModal() {
    const modal = document.getElementById('workflowModal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Workflow filtering functionality
let currentWorkflowFilter = 'all'; // 'all', 'critical', 'warning', 'provider'

function filterWorkflow(filterType) {
    currentWorkflowFilter = filterType;
    const caseItems = document.querySelectorAll('.case-item');
    const criticalCard = document.querySelector('#workflowModal .stat-item.critical');
    const warningCard = document.querySelector('#workflowModal .stat-item.warning');
    const providerCard = document.querySelector('#workflowModal .stat-item.provider');
    const allCard = document.querySelector('#workflowModal .stat-item.revenue');
    
    // Update visual feedback for filter cards
    [criticalCard, warningCard, providerCard, allCard].forEach(card => {
        if (card) {
            card.classList.remove('active');
        }
    });
    
    if (filterType === 'critical' && criticalCard) {
        criticalCard.classList.add('active');
    } else if (filterType === 'warning' && warningCard) {
        warningCard.classList.add('active');
    } else if (filterType === 'provider' && providerCard) {
        providerCard.classList.add('active');
    } else if (filterType === 'all' && allCard) {
        allCard.classList.add('active');
    }
    
    // Filter case items
    caseItems.forEach(item => {
        if (filterType === 'all') {
            item.style.display = 'flex';
        } else if (filterType === 'critical') {
            item.style.display = item.classList.contains('critical') ? 'flex' : 'none';
        } else if (filterType === 'warning') {
            item.style.display = item.classList.contains('warning') ? 'flex' : 'none';
        } else if (filterType === 'provider') {
            // Show all cases for provider filter (could be enhanced to filter by specific provider)
            item.style.display = 'flex';
        }
    });
    
    // Update the modal title to reflect the filter
    const modalTitle = document.querySelector('#workflowModal .modal-title h2');
    const modalSubtitle = document.querySelector('#workflowModal .modal-title p');
    
    if (filterType === 'all') {
        modalTitle.textContent = 'Chiropractic Treatment Codes Analysis';
        modalSubtitle.textContent = 'Wrong CPT codes used for spinal adjustments • 23 rejections this month • $4,600 lost';
    } else if (filterType === 'critical') {
        modalTitle.textContent = 'Critical Chiropractic Code Errors';
        modalSubtitle.textContent = '15 critical errors requiring immediate attention • $3,200 at risk';
    } else if (filterType === 'warning') {
        modalTitle.textContent = 'Warning Chiropractic Code Issues';
        modalSubtitle.textContent = '8 warning issues that need attention • $1,400 at risk';
    } else if (filterType === 'provider') {
        modalTitle.textContent = 'Provider-Specific Code Analysis';
        modalSubtitle.textContent = '3 providers affected by chiropractic code errors • Training required';
    }
}

function clearWorkflowFilters() {
    filterWorkflow('all');
}

// Workflow case management functions
function fixCase(caseId) {
    console.log('Fixing case:', caseId);
    
    // Find the case item
    const caseItem = document.querySelector(`[data-case-id="${caseId}"]`).closest('.case-item');
    const fixBtn = caseItem.querySelector('.action-btn.primary');
    
    // Update button state
    fixBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fixing...';
    fixBtn.disabled = true;
    
    // Simulate case fixing
    setTimeout(() => {
        fixBtn.innerHTML = '<i class="fas fa-check"></i> Fixed';
        fixBtn.style.backgroundColor = '#10b981';
        fixBtn.style.borderColor = '#10b981';
        
        // Update case status
        const statusBadge = caseItem.querySelector('.case-status');
        statusBadge.textContent = 'Fixed';
        statusBadge.className = 'case-status fixed';
        statusBadge.style.backgroundColor = '#d1fae5';
        statusBadge.style.color = '#065f46';
        
        // Show success message
        setTimeout(() => {
            alert(`Case ${caseId} has been successfully fixed. The correct CPT code has been applied and the claim has been resubmitted.`);
        }, 500);
    }, 2000);
}

function viewCaseDetails(caseId) {
    console.log('Viewing details for case:', caseId);
    
    // Simulate opening detailed view
    alert(`Opening detailed view for Case ${caseId}:\n\n• Complete billing history\n• CPT code analysis\n• Provider documentation\n• Insurance correspondence\n• Corrective action timeline\n• Related claims and procedures`);
}

function generateCorrectivePlan() {
    const selectedCases = document.querySelectorAll('.case-check:checked');
    
    if (selectedCases.length === 0) {
        alert('Please select at least one case to generate a corrective action plan.');
        return;
    }
    
    const totalImpact = Array.from(selectedCases).reduce((sum, checkbox) => {
        const amount = checkbox.closest('.case-item').querySelector('.case-amount').textContent;
        return sum + parseFloat(amount.replace('$', '').replace(',', ''));
    }, 0);
    
    alert(`Generating corrective action plan for ${selectedCases.length} selected cases worth $${totalImpact.toLocaleString()}:\n\n• Provider training schedule\n• System validation rules\n• Monitoring and reporting setup\n• Timeline and milestones\n• Success metrics and KPIs\n\nPlan will be generated and sent to all affected providers.`);
}

function scheduleTraining() {
    alert('Scheduling provider training sessions:\n\n• Dr. Smith: Dec 20, 2024 at 2:00 PM\n• Dr. Johnson: Dec 21, 2024 at 10:00 AM\n• Dr. Williams: Dec 22, 2024 at 3:00 PM\n\nTraining topics:\n• Proper CPT code usage for chiropractic treatments\n• Documentation requirements\n• Billing best practices\n• Common mistakes to avoid');
}

function setupValidation() {
    alert('Setting up system validation rules:\n\n• Flag 98940 usage for sessions > 15 minutes\n• Require provider confirmation for extended treatments\n• Automatic alerts for potential coding errors\n• Integration with practice management system\n\nValidation rules will be active within 24 hours.');
}

function setupMonitoring() {
    alert('Setting up monthly monitoring reports:\n\n• CPT code accuracy tracking\n• Provider performance metrics\n• Revenue impact analysis\n• Trend identification\n• Automated alerts for recurring issues\n\nFirst report will be generated on January 1, 2025.');
}

function exportWorkflowAnalysis() {
    const selectedCases = document.querySelectorAll('.case-check:checked');
    
    if (selectedCases.length === 0) {
        alert('Please select at least one case to export.');
        return;
    }
    
    // Simulate export functionality
    alert(`Exporting workflow analysis for ${selectedCases.length} selected cases:\n\n• Detailed problem analysis\n• Affected cases and providers\n• Corrective action recommendations\n• Training materials\n• Monitoring setup guide\n• Implementation timeline\n\nExport will be downloaded as a comprehensive PDF report.`);
}

function updateWorkflowSelectedCount() {
    const selectedCases = document.querySelectorAll('.case-check:checked');
    const selectedCount = document.querySelector('#workflowModal .selected-count');
    const totalImpact = document.querySelector('#workflowModal .total-impact');
    
    if (selectedCount) {
        selectedCount.textContent = `${selectedCases.length} selected`;
    }
    
    if (totalImpact) {
        const totalValue = Array.from(selectedCases).reduce((sum, checkbox) => {
            const amount = checkbox.closest('.case-item').querySelector('.case-amount').textContent;
            return sum + parseFloat(amount.replace('$', '').replace(',', ''));
        }, 0);
        
        totalImpact.textContent = `Total Impact: $${totalValue.toLocaleString()}`;
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const claimsModal = document.getElementById('claimsModal');
    const denialsModal = document.getElementById('denialsModal');
    const revenueModal = document.getElementById('revenueModal');
    const workflowModal = document.getElementById('workflowModal');
    
    if (event.target === claimsModal) {
        closeClaimsModal();
    } else if (event.target === denialsModal) {
        closeDenialsModal();
    } else if (event.target === revenueModal) {
        closeRevenueModal();
    } else if (event.target === workflowModal) {
        closeWorkflowModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const claimsModal = document.getElementById('claimsModal');
        const denialsModal = document.getElementById('denialsModal');
        const revenueModal = document.getElementById('revenueModal');
        const workflowModal = document.getElementById('workflowModal');
        
        if (claimsModal.classList.contains('open')) {
            closeClaimsModal();
        } else if (denialsModal.classList.contains('open')) {
            closeDenialsModal();
        } else if (revenueModal.classList.contains('open')) {
            closeRevenueModal();
        } else if (workflowModal.classList.contains('open')) {
            closeWorkflowModal();
        }
    }
});

// Claims filtering functionality
let currentFilter = 'all'; // 'all', 'urgent', 'warning'

function filterClaims(filterType) {
    currentFilter = filterType;
    const claimItems = document.querySelectorAll('.claim-item');
    const urgentCard = document.querySelector('.stat-item.urgent');
    const warningCard = document.querySelector('.stat-item.warning');
    
    // Update visual feedback for filter cards
    if (urgentCard) {
        urgentCard.classList.remove('active');
        if (filterType === 'urgent') {
            urgentCard.classList.add('active');
        }
    }
    
    if (warningCard) {
        warningCard.classList.remove('active');
        if (filterType === 'warning') {
            warningCard.classList.add('active');
        }
    }
    
    // Filter claim items
    claimItems.forEach(item => {
        if (filterType === 'all') {
            item.style.display = 'flex';
        } else if (filterType === 'urgent') {
            item.style.display = item.classList.contains('urgent') ? 'flex' : 'none';
        } else if (filterType === 'warning') {
            item.style.display = item.classList.contains('warning') ? 'flex' : 'none';
        }
    });
    
    // Update the modal title to reflect the filter
    const modalTitle = document.querySelector('.modal-title h2');
    const modalSubtitle = document.querySelector('.modal-title p');
    
    if (filterType === 'all') {
        modalTitle.textContent = 'Claims Approaching 30-Day Deadline';
        modalSubtitle.textContent = '12 claims require immediate attention to prevent denial';
    } else if (filterType === 'urgent') {
        modalTitle.textContent = 'Urgent Claims (0-5 days)';
        modalSubtitle.textContent = '8 claims require immediate attention';
    } else if (filterType === 'warning') {
        modalTitle.textContent = 'Warning Claims (6-10 days)';
        modalSubtitle.textContent = '4 claims need attention soon';
    }
}

function clearFilters() {
    filterClaims('all');
}

// Denials Modal Functions
function openDenialsModal() {
    const modal = document.getElementById('denialsModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Reset filter to show all denials when modal opens
    filterDenials('all');
    updateSelectedCount();
}

function closeDenialsModal() {
    const modal = document.getElementById('denialsModal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Denials filtering functionality
let currentDenialFilter = 'all'; // 'all', 'urgent', 'warning'

function filterDenials(filterType) {
    currentDenialFilter = filterType;
    const denialItems = document.querySelectorAll('.denial-item');
    const urgentCard = document.querySelector('#denialsModal .stat-item.urgent');
    const warningCard = document.querySelector('#denialsModal .stat-item.warning');
    const allCard = document.querySelector('#denialsModal .stat-item.info');
    
    // Update visual feedback for filter cards
    if (urgentCard) {
        urgentCard.classList.remove('active');
        if (filterType === 'urgent') {
            urgentCard.classList.add('active');
        }
    }
    
    if (warningCard) {
        warningCard.classList.remove('active');
        if (filterType === 'warning') {
            warningCard.classList.add('active');
        }
    }
    
    if (allCard) {
        allCard.classList.remove('active');
        if (filterType === 'all') {
            allCard.classList.add('active');
        }
    }
    
    // Filter denial items
    denialItems.forEach(item => {
        if (filterType === 'all') {
            item.style.display = 'flex';
        } else if (filterType === 'urgent') {
            item.style.display = item.classList.contains('urgent') ? 'flex' : 'none';
        } else if (filterType === 'warning') {
            item.style.display = item.classList.contains('warning') ? 'flex' : 'none';
        }
    });
    
    // Update the modal title to reflect the filter
    const modalTitle = document.querySelector('#denialsModal .modal-title h2');
    const modalSubtitle = document.querySelector('#denialsModal .modal-title p');
    
    if (filterType === 'all') {
        modalTitle.textContent = 'Denials Requiring Appeal';
        modalSubtitle.textContent = '6 denials with $2,340 at risk - Appeal deadline expires in 2 days';
    } else if (filterType === 'urgent') {
        modalTitle.textContent = 'Urgent Denials (1-2 days)';
        modalSubtitle.textContent = '3 denials with $1,660 at risk - Appeal deadline expires tomorrow';
    } else if (filterType === 'warning') {
        modalTitle.textContent = 'Warning Denials (3-5 days)';
        modalSubtitle.textContent = '3 denials with $680 at risk - Appeal deadline expires in 3 days';
    }
}

function clearDenialFilters() {
    filterDenials('all');
}

// Denial management functions
function appealDenial(denialId) {
    console.log('Appealing denial:', denialId);
    
    // Find the denial item
    const denialItem = document.querySelector(`[data-denial-id="${denialId}"]`).closest('.denial-item');
    const appealBtn = denialItem.querySelector('.action-btn.primary');
    
    // Update button state
    appealBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    appealBtn.disabled = true;
    
    // Simulate appeal processing
    setTimeout(() => {
        appealBtn.innerHTML = '<i class="fas fa-check"></i> Appealed';
        appealBtn.style.backgroundColor = '#10b981';
        appealBtn.style.borderColor = '#10b981';
        
        // Update denial status
        const statusBadge = denialItem.querySelector('.denial-status');
        statusBadge.textContent = 'Appealed';
        statusBadge.className = 'denial-status appealed';
        statusBadge.style.backgroundColor = '#d1fae5';
        statusBadge.style.color = '#065f46';
        
        // Show success message
        setTimeout(() => {
            alert(`Denial ${denialId} has been successfully appealed and submitted to the insurance company.`);
        }, 500);
    }, 2000);
}

function viewDenialDetails(denialId) {
    console.log('Viewing details for denial:', denialId);
    
    // Simulate opening detailed view
    alert(`Opening detailed view for Denial ${denialId}:\n\n• Complete denial history\n• All correspondence with insurance\n• Supporting documentation\n• Appeal timeline and status\n• Related claims and procedures`);
}

function bulkAppeal() {
    const selectedDenials = document.querySelectorAll('.denial-check:checked');
    
    if (selectedDenials.length === 0) {
        alert('Please select at least one denial to appeal.');
        return;
    }
    
    const confirmation = confirm(`Are you sure you want to appeal ${selectedDenials.length} selected denials? This action cannot be undone.`);
    
    if (confirmation) {
        // Process each selected denial
        selectedDenials.forEach(checkbox => {
            const denialId = checkbox.getAttribute('data-denial-id');
            appealDenial(denialId);
        });
        
        // Update selected count
        updateSelectedCount();
    }
}

function exportDenials() {
    const selectedDenials = document.querySelectorAll('.denial-check:checked');
    
    if (selectedDenials.length === 0) {
        alert('Please select at least one denial to export.');
        return;
    }
    
    // Simulate export functionality
    alert(`Exporting ${selectedDenials.length} selected denials:\n\n• Denial details and reasons\n• Patient information\n• Appeal strategies\n• Supporting documentation\n• Timeline and deadlines\n\nExport will be downloaded as a PDF file.`);
}

function updateSelectedCount() {
    const selectedDenials = document.querySelectorAll('.denial-check:checked');
    const selectedCount = document.querySelector('.selected-count');
    
    if (selectedCount) {
        selectedCount.textContent = `${selectedDenials.length} selected`;
    }
}

// Add event listeners for checkboxes
document.addEventListener('DOMContentLoaded', function() {
    // Add change listeners to all denial checkboxes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('denial-check')) {
            updateSelectedCount();
        } else if (e.target.classList.contains('opportunity-check')) {
            updateRevenueSelectedCount();
        } else if (e.target.classList.contains('case-check')) {
            updateWorkflowSelectedCount();
        }
    });
});

// Action Items Data (will be populated based on role)
let actionItems = [];

// Pagination variables
let currentActionPage = 0;
const actionsPerPage = 3;

// Initialize action items
function initializeActionItems() {
    renderActionItems();
    updatePaginationControls();
}

// Render action items for current page
function renderActionItems() {
    const actionList = document.getElementById('actionList');
    const startIndex = currentActionPage * actionsPerPage;
    const endIndex = startIndex + actionsPerPage;
    const pageItems = actionItems.slice(startIndex, endIndex);
    
    actionList.innerHTML = pageItems.map((item, index) => `
        <div class="action-item ${item.type}" onclick="handleActionItemClick('${item.title}', ${startIndex + index})">
            <div class="action-info">
                <div class="action-type">${getTypeLabel(item.type)}</div>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
            <div class="action-impact">
                <span class="impact-text">${item.impact}</span>
            </div>
        </div>
    `).join('');
}

// Get type label
function getTypeLabel(type) {
    const labels = {
        urgent: 'Urgent',
        warning: 'Time Sensitive',
        info: 'Opportunity'
    };
    return labels[type] || type;
}

// Update pagination controls
function updatePaginationControls() {
    const totalPages = Math.ceil(actionItems.length / actionsPerPage);
    const prevBtn = document.getElementById('actionPrevBtn');
    const nextBtn = document.getElementById('actionNextBtn');
    const pageInfo = document.getElementById('actionPageInfo');
    
    // Update button states
    prevBtn.disabled = currentActionPage === 0;
    nextBtn.disabled = currentActionPage === totalPages - 1;
    
    // Update page info
    pageInfo.textContent = `Page ${currentActionPage + 1} of ${totalPages}`;
}

// Change action page
function changeActionPage(direction) {
    const totalPages = Math.ceil(actionItems.length / actionsPerPage);
    
    if (direction === 'next' && currentActionPage < totalPages - 1) {
        currentActionPage++;
    } else if (direction === 'prev' && currentActionPage > 0) {
        currentActionPage--;
    }
    
    renderActionItems();
    updatePaginationControls();
}

// Insights Toggle
function toggleInsights() {
    const details = document.getElementById('insightsDetails');
    const expandIcon = document.getElementById('insightsExpandIcon');
    
    if (details.classList.contains('expanded')) {
        // Collapse
        details.classList.remove('expanded');
        expandIcon.classList.remove('rotated');
    } else {
        // Expand
        details.classList.add('expanded');
        expandIcon.classList.add('rotated');
        // Initialize action items when expanding
        initializeActionItems();
    }
}


// Workflow Insights Toggle
function toggleWorkflowInsights() {
    const details = document.getElementById('workflowDetails');
    const expandIcon = document.querySelector('.expand-icon');
    
    if (details.classList.contains('expanded')) {
        // Collapse
        details.classList.remove('expanded');
        expandIcon.classList.remove('rotated');
    } else {
        // Expand
        details.classList.add('expanded');
        expandIcon.classList.add('rotated');
    }
}

// Chat Functions
function sendMessage() {
    const chatInput = document.querySelector('.chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        addUserMessage(message);
        chatInput.value = '';
        
        // Simulate assistant response
        setTimeout(() => {
            addAssistantResponse(message);
        }, 1000);
    }
}

function addUserMessage(message) {
    const chatContainer = document.querySelector('.chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">${message}</div>
    `;
    
    // Insert before the suggested prompts
    const suggestedPrompts = chatContainer.querySelector('.suggested-prompts');
    chatContainer.insertBefore(messageDiv, suggestedPrompts);
    
    // Scroll to bottom
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
}

function addAssistantResponse(userMessage) {
    const chatContainer = document.querySelector('.chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message assistant';
    
    // Generate contextual response based on user message
    let response = generateResponse(userMessage);
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">${response}</div>
    `;
    
    // Insert before the suggested prompts
    const suggestedPrompts = chatContainer.querySelector('.suggested-prompts');
    chatContainer.insertBefore(messageDiv, suggestedPrompts);
    
    // Scroll to bottom
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
}

function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('denial') || message.includes('denied')) {
        return "I can help you analyze common denial reasons. The most frequent denials in your system are: Missing documentation (23%), Incorrect coding (18%), and Prior authorization required (15%). Would you like me to show you specific cases?";
    } else if (message.includes('remittance') || message.includes('payment')) {
        return "You have 6 pending remittances totaling $2,340. The oldest pending remittance is from 3 days ago. Would you like me to show you the details of any specific remittance?";
    } else if (message.includes('processing') || message.includes('time')) {
        return "Average processing time for claims is 7.2 days. Claims submitted on weekdays typically process 2 days faster than weekend submissions. Your current submission rate is 15% above average.";
    } else if (message.includes('billing') || message.includes('revenue')) {
        return "Your current monthly revenue is $45,230, which is 8% higher than last month. Today's sales of $2,450 show a 12% increase from yesterday. Would you like me to break down the revenue by category?";
    } else {
        return "I understand you're asking about \"" + userMessage + "\". I can help you with claim submissions, denials, remittances, or billing patterns. Could you be more specific about what you'd like to know?";
    }
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate metric cards on load
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add hover effects to cards
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .chat-message.user .message-content {
        background-color: #20b2aa;
        color: white;
        margin-left: auto;
        margin-right: 0;
    }
    
    .chat-message.user {
        flex-direction: row-reverse;
    }
    
    .chat-message.user .message-avatar {
        background-color: #20b2aa;
        color: white;
    }
`;
document.head.appendChild(style);