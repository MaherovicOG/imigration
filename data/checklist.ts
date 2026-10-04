export interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  category: 'logistics' | 'housing' | 'paperwork' | 'packing' | 'utilities';
  priority: 'high' | 'medium' | 'low';
}

export interface ChecklistPhase {
  id: string;
  timeframe: string;
  subtitle: string;
  tasks: ChecklistTask[];
}

export const MOVING_CHECKLIST_DATA: ChecklistPhase[] = [
  {
    id: 'phase_8_weeks',
    timeframe: '8 Weeks Before Moving',
    subtitle: 'Planning, budgeting, and strategy',
    tasks: [
      {
        id: 'task_8w_1',
        title: 'Research your destination state & neighborhood',
        description: 'Compare cost of living, school districts, commute times, and tax differences using MoveWise USA tools.',
        category: 'housing',
        priority: 'high'
      },
      {
        id: 'task_8w_2',
        title: 'Estimate your total moving budget',
        description: 'Calculate low, typical, and high moving costs for full-service movers vs. DIY rental trucks.',
        category: 'logistics',
        priority: 'high'
      },
      {
        id: 'task_8w_3',
        title: 'Create a master moving binder or digital folder',
        description: 'Store lease agreements, mover estimates, receipts, medical records, and pet vaccine certificates.',
        category: 'paperwork',
        priority: 'medium'
      },
      {
        id: 'task_8w_4',
        title: 'Begin room-by-room decluttering',
        description: 'Sort belongings into keep, donate, sell, and discard piles. Moving less weight saves hundreds of dollars.',
        category: 'packing',
        priority: 'high'
      }
    ]
  },
  {
    id: 'phase_6_weeks',
    timeframe: '6 Weeks Before Moving',
    subtitle: 'Booking, inventory, and school enrollment',
    tasks: [
      {
        id: 'task_6w_1',
        title: 'Get in-home or virtual estimates from 3 licensed movers',
        description: 'Verify USDOT licenses and insurance. Ensure written binding estimates to prevent unexpected moving day markups.',
        category: 'logistics',
        priority: 'high'
      },
      {
        id: 'task_6w_2',
        title: 'Notify your current landlord or prepare home for sale',
        description: 'Check required notice periods (usually 30 to 60 days) to avoid penalty fees.',
        category: 'housing',
        priority: 'high'
      },
      {
        id: 'task_6w_3',
        title: 'Request school and medical records transfer',
        description: 'Obtain official transcripts, immunization cards, and prescription refills from your current providers.',
        category: 'paperwork',
        priority: 'medium'
      },
      {
        id: 'task_6w_4',
        title: 'Source quality packing materials',
        description: 'Acquire heavy-duty boxes, bubble wrap, packing paper, wardrobe boxes, and heavy packing tape.',
        category: 'packing',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'phase_4_weeks',
    timeframe: '4 Weeks Before Moving',
    subtitle: 'Utilities, address changes, and active packing',
    tasks: [
      {
        id: 'task_4w_1',
        title: 'Schedule disconnection & setup of utilities',
        description: 'Arrange electric, natural gas, water, internet, and trash cancellation at current home and activation at destination.',
        category: 'utilities',
        priority: 'high'
      },
      {
        id: 'task_4w_2',
        title: 'Submit official USPS change of address',
        description: 'Set up mail forwarding starting on your move date via usps.com.',
        category: 'paperwork',
        priority: 'high'
      },
      {
        id: 'task_4w_3',
        title: 'Pack non-essential and seasonal items',
        description: 'Pack garage gear, books, off-season wardrobe, decorative art, and guest room items. Label every box with room name.',
        category: 'packing',
        priority: 'medium'
      },
      {
        id: 'task_4w_4',
        title: 'Arrange auto transport or service your vehicle',
        description: 'If driving cross-country, schedule an oil change, tire rotation, and fluid check. If shipping, confirm carrier dates.',
        category: 'logistics',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'phase_2_weeks',
    timeframe: '2 Weeks Before Moving',
    subtitle: 'Final confirmations and packing core items',
    tasks: [
      {
        id: 'task_2w_1',
        title: 'Reconfirm moving company arrival window & payment',
        description: 'Verify arrival time, driver contact info, parking permits, and acceptable payment methods (cashier check/credit).',
        category: 'logistics',
        priority: 'high'
      },
      {
        id: 'task_2w_2',
        title: 'Update bank, insurance, and payroll records',
        description: 'Update your address with employers, banks, credit cards, auto insurance, and health insurers.',
        category: 'paperwork',
        priority: 'high'
      },
      {
        id: 'task_2w_3',
        title: 'Consume or donate perishable freezer/pantry food',
        description: 'Plan meals around remaining groceries and avoid buying bulk groceries.',
        category: 'packing',
        priority: 'low'
      },
      {
        id: 'task_2w_4',
        title: 'Disassemble large non-essential furniture',
        description: 'Bag and tape screws, bolts, and remotes directly to corresponding furniture parts.',
        category: 'packing',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'phase_1_week',
    timeframe: '1 Week Before Moving',
    subtitle: 'Essentials box and final walkthrough prep',
    tasks: [
      {
        id: 'task_1w_1',
        title: 'Pack an "Open First" essentials box for each person',
        description: 'Include 3 days of clothes, toiletries, phone chargers, medications, laptop, bedding, towels, and coffee maker.',
        category: 'packing',
        priority: 'high'
      },
      {
        id: 'task_1w_2',
        title: 'Defrost and clean your refrigerator & freezer',
        description: 'Allow 24-48 hours for full defrosting and wipe dry to prevent mold during transit.',
        category: 'utilities',
        priority: 'medium'
      },
      {
        id: 'task_1w_3',
        title: 'Prepare cash tips and beverages for movers',
        description: 'Standard mover tipping ranges from $20 to $50 per mover per day depending on service quality.',
        category: 'logistics',
        priority: 'low'
      },
      {
        id: 'task_1w_4',
        title: 'Complete final deep clean or hire move-out cleaners',
        description: 'Ensure property is spotless for security deposit refund or new owner handover.',
        category: 'housing',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'phase_moving_day',
    timeframe: 'Moving Day & First Week',
    subtitle: 'Execution and settling into your new state',
    tasks: [
      {
        id: 'task_md_1',
        title: 'Take timestamped photos of empty old residence',
        description: 'Document the exact condition of walls, floors, and appliances for landlord deposit records.',
        category: 'housing',
        priority: 'high'
      },
      {
        id: 'task_md_2',
        title: 'Oversee loading and sign bill of lading',
        description: 'Walk through with lead mover, note preexisting damages on inventory sheet, and get driver phone number.',
        category: 'logistics',
        priority: 'high'
      },
      {
        id: 'task_md_3',
        title: 'Inspect delivered items before signing delivery receipt',
        description: 'Cross-check inventory numbers and immediately note any damaged boxes or broken furniture.',
        category: 'logistics',
        priority: 'high'
      },
      {
        id: 'task_md_4',
        title: 'Transfer driver’s license and register vehicle in new state',
        description: 'Most states require license transfer within 30 to 90 days of establishing residency.',
        category: 'paperwork',
        priority: 'high'
      },
      {
        id: 'task_md_5',
        title: 'Register to vote in your new county',
        description: 'Register online or at the local DMV when updating your driver license.',
        category: 'paperwork',
        priority: 'medium'
      }
    ]
  }
];
