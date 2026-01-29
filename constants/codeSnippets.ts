// Code snippets for Material3 components
// React and Flutter implementations - Categorized by component type

export interface CodeSnippetItem {
  title: string;
  titleKo: string;
  react: string;
  flutter: string;
}

export interface ComponentCodeSnippets {
  snippets: CodeSnippetItem[];
}

export const CODE_SNIPPETS: Record<string, ComponentCodeSnippets> = {
  button: {
    snippets: [
      {
        title: 'Elevated Button',
        titleKo: 'Elevated 버튼',
        react: `<Button variant="elevated" onClick={handleClick}>
  Elevated
</Button>`,
        flutter: `ElevatedButton(
  onPressed: () {},
  child: Text('Elevated'),
)`,
      },
      {
        title: 'Filled Button',
        titleKo: 'Filled 버튼',
        react: `<Button variant="filled" onClick={handleClick}>
  Filled
</Button>`,
        flutter: `FilledButton(
  onPressed: () {},
  child: Text('Filled'),
)`,
      },
      {
        title: 'Filled Tonal Button',
        titleKo: 'Tonal 버튼',
        react: `<Button variant="tonal" onClick={handleClick}>
  Tonal
</Button>`,
        flutter: `FilledButton.tonal(
  onPressed: () {},
  child: Text('Tonal'),
)`,
      },
      {
        title: 'Outlined Button',
        titleKo: 'Outlined 버튼',
        react: `<Button variant="outlined" onClick={handleClick}>
  Outlined
</Button>`,
        flutter: `OutlinedButton(
  onPressed: () {},
  child: Text('Outlined'),
)`,
      },
      {
        title: 'Text Button',
        titleKo: 'Text 버튼',
        react: `<Button variant="text" onClick={handleClick}>
  Text
</Button>`,
        flutter: `TextButton(
  onPressed: () {},
  child: Text('Text'),
)`,
      },
      {
        title: 'Button with Icon',
        titleKo: '아이콘 버튼',
        react: `<Button variant="filled">
  <Icon slot="icon">send</Icon>
  Send
</Button>`,
        flutter: `FilledButton.icon(
  onPressed: () {},
  icon: Icon(Icons.send),
  label: Text('Send'),
)`,
      },
      {
        title: 'Disabled Button',
        titleKo: '비활성화 버튼',
        react: `<Button variant="filled" disabled>
  Disabled
</Button>`,
        flutter: `FilledButton(
  onPressed: null,
  child: Text('Disabled'),
)`,
      },
    ],
  },

  fab: {
    snippets: [
      {
        title: 'Standard FAB',
        titleKo: '기본 FAB',
        react: `<Fab onClick={handleClick}>
  <Icon slot="icon">add</Icon>
</Fab>`,
        flutter: `FloatingActionButton(
  onPressed: () {},
  child: Icon(Icons.add),
)`,
      },
      {
        title: 'Small FAB',
        titleKo: '작은 FAB',
        react: `<Fab size="small">
  <Icon slot="icon">edit</Icon>
</Fab>`,
        flutter: `FloatingActionButton.small(
  onPressed: () {},
  child: Icon(Icons.edit),
)`,
      },
      {
        title: 'Large FAB',
        titleKo: '큰 FAB',
        react: `<Fab size="large">
  <Icon slot="icon">add</Icon>
</Fab>`,
        flutter: `FloatingActionButton.large(
  onPressed: () {},
  child: Icon(Icons.add),
)`,
      },
      {
        title: 'Extended FAB',
        titleKo: '확장 FAB',
        react: `<Fab variant="extended">
  <Icon slot="icon">navigation</Icon>
  Navigate
</Fab>`,
        flutter: `FloatingActionButton.extended(
  onPressed: () {},
  icon: Icon(Icons.navigation),
  label: Text('Navigate'),
)`,
      },
    ],
  },

  'icon-button': {
    snippets: [
      {
        title: 'Standard Icon Button',
        titleKo: '기본 아이콘 버튼',
        react: `<IconButton onClick={handleClick}>
  <Icon>settings</Icon>
</IconButton>`,
        flutter: `IconButton(
  onPressed: () {},
  icon: Icon(Icons.settings),
)`,
      },
      {
        title: 'Filled Icon Button',
        titleKo: 'Filled 아이콘 버튼',
        react: `<IconButton variant="filled">
  <Icon>favorite</Icon>
</IconButton>`,
        flutter: `IconButton.filled(
  onPressed: () {},
  icon: Icon(Icons.favorite),
)`,
      },
      {
        title: 'Filled Tonal Icon Button',
        titleKo: 'Tonal 아이콘 버튼',
        react: `<IconButton variant="tonal">
  <Icon>bookmark</Icon>
</IconButton>`,
        flutter: `IconButton.filledTonal(
  onPressed: () {},
  icon: Icon(Icons.bookmark),
)`,
      },
      {
        title: 'Outlined Icon Button',
        titleKo: 'Outlined 아이콘 버튼',
        react: `<IconButton variant="outlined">
  <Icon>share</Icon>
</IconButton>`,
        flutter: `IconButton.outlined(
  onPressed: () {},
  icon: Icon(Icons.share),
)`,
      },
      {
        title: 'Toggle Icon Button',
        titleKo: '토글 아이콘 버튼',
        react: `<IconButton toggle selected={isSelected}>
  <Icon>favorite_border</Icon>
  <Icon slot="selected">favorite</Icon>
</IconButton>`,
        flutter: `IconButton(
  onPressed: () => setState(() => isSelected = !isSelected),
  isSelected: isSelected,
  icon: Icon(Icons.favorite_border),
  selectedIcon: Icon(Icons.favorite),
)`,
      },
    ],
  },

  'segmented-buttons': {
    snippets: [
      {
        title: 'Single Select',
        titleKo: '단일 선택',
        react: `const [selected, setSelected] = useState('day');
const options = ['Day', 'Week', 'Month', 'Year'];

<div className="inline-flex rounded-full border border-neutral-300 dark:border-neutral-600 overflow-hidden">
  {options.map((option) => (
    <button
      key={option}
      onClick={() => setSelected(option.toLowerCase())}
      className={\`px-4 py-2 text-sm font-medium transition-colors
        \${selected === option.toLowerCase()
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}\`}
    >
      {selected === option.toLowerCase() && <span className="mr-1">✓</span>}
      {option}
    </button>
  ))}
</div>`,
        flutter: `String selected = 'day';

SegmentedButton<String>(
  segments: [
    ButtonSegment(value: 'day', label: Text('Day')),
    ButtonSegment(value: 'week', label: Text('Week')),
    ButtonSegment(value: 'month', label: Text('Month')),
    ButtonSegment(value: 'year', label: Text('Year')),
  ],
  selected: {selected},
  onSelectionChanged: (newSelection) {
    setState(() => selected = newSelection.first);
  },
)`,
      },
      {
        title: 'Multi Select',
        titleKo: '다중 선택',
        react: `const [formats, setFormats] = useState(['bold']);
const options = [
  { id: 'bold', icon: 'B', style: 'font-bold' },
  { id: 'italic', icon: 'I', style: 'italic' },
  { id: 'underline', icon: 'U', style: 'underline' },
];

const toggleFormat = (id) => {
  setFormats(prev =>
    prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
  );
};

<div className="inline-flex rounded-full border border-neutral-300 dark:border-neutral-600 overflow-hidden">
  {options.map((option) => (
    <button
      key={option.id}
      onClick={() => toggleFormat(option.id)}
      className={\`w-10 h-10 flex items-center justify-center text-sm transition-colors
        \${formats.includes(option.id)
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}
        \${option.style}\`}
    >
      {formats.includes(option.id) && <span className="mr-0.5 text-xs">✓</span>}
      {option.icon}
    </button>
  ))}
</div>`,
        flutter: `Set<String> formats = {'bold'};

SegmentedButton<String>(
  segments: [
    ButtonSegment(value: 'bold', icon: Icon(Icons.format_bold)),
    ButtonSegment(value: 'italic', icon: Icon(Icons.format_italic)),
    ButtonSegment(value: 'underline', icon: Icon(Icons.format_underline)),
  ],
  selected: formats,
  onSelectionChanged: (newSelection) {
    setState(() => formats = newSelection);
  },
  multiSelectionEnabled: true,
)`,
      },
    ],
  },

  badge: {
    snippets: [
      {
        title: 'Small Badge (Dot)',
        titleKo: '작은 배지 (점)',
        react: `<Badge>
  <Icon>notifications</Icon>
</Badge>`,
        flutter: `Badge(
  child: Icon(Icons.notifications),
)`,
      },
      {
        title: 'Badge with Number',
        titleKo: '숫자 배지',
        react: `<Badge value={5}>
  <Icon>mail</Icon>
</Badge>`,
        flutter: `Badge(
  label: Text('5'),
  child: Icon(Icons.mail),
)`,
      },
      {
        title: 'Badge with Max',
        titleKo: '최대값 배지',
        react: `<Badge value={1000} max={999}>
  <Icon>notifications</Icon>
</Badge>`,
        flutter: `Badge(
  label: Text('999+'),
  child: Icon(Icons.notifications),
)`,
      },
    ],
  },

  'progress-indicators': {
    snippets: [
      {
        title: 'Circular Indeterminate',
        titleKo: '원형 (무한)',
        react: `<CircularProgress indeterminate />`,
        flutter: `CircularProgressIndicator()`,
      },
      {
        title: 'Circular Determinate',
        titleKo: '원형 (진행률)',
        react: `<CircularProgress value={0.75} />`,
        flutter: `CircularProgressIndicator(value: 0.75)`,
      },
      {
        title: 'Linear Indeterminate',
        titleKo: '선형 (무한)',
        react: `<LinearProgress indeterminate />`,
        flutter: `LinearProgressIndicator()`,
      },
      {
        title: 'Linear Determinate',
        titleKo: '선형 (진행률)',
        react: `<LinearProgress value={0.5} />`,
        flutter: `LinearProgressIndicator(value: 0.5)`,
      },
    ],
  },

  snackbar: {
    snippets: [
      {
        title: 'Basic Snackbar',
        titleKo: '기본 스낵바',
        react: `const [visible, setVisible] = useState(false);

const showSnackbar = () => {
  setVisible(true);
  setTimeout(() => setVisible(false), 4000);
};

<div className="flex flex-col items-start gap-4">
  <button
    onClick={showSnackbar}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  >
    Send Message
  </button>
  <div className={\`px-4 py-3 bg-neutral-800 text-white text-sm rounded-lg shadow-lg
    transition-all duration-200
    \${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}\`}>
    Message sent
  </div>
</div>`,
        flutter: `ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Message sent'),
    duration: Duration(seconds: 4),
  ),
);`,
      },
      {
        title: 'Snackbar with Action',
        titleKo: '액션 스낵바',
        react: `const [visible, setVisible] = useState(false);
const [undone, setUndone] = useState(false);

const showSnackbar = () => {
  setVisible(true);
  setUndone(false);
  setTimeout(() => setVisible(false), 4000);
};

const handleUndo = () => {
  setUndone(true);
  setTimeout(() => { setVisible(false); setUndone(false); }, 1000);
};

<div className="flex flex-col items-start gap-4">
  <button
    onClick={showSnackbar}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    Archive Email
  </button>
  <div className={\`px-4 py-3 bg-neutral-800 text-white text-sm rounded-lg shadow-lg
    flex items-center gap-4 transition-all duration-200
    \${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}\`}>
    <span>{undone ? 'Undone' : 'Email archived'}</span>
    {!undone && (
      <button onClick={handleUndo} className="text-blue-400 font-medium hover:text-blue-300">
        Undo
      </button>
    )}
  </div>
</div>`,
        flutter: `ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Email archived'),
    action: SnackBarAction(
      label: 'Undo',
      onPressed: () {
        // Undo logic
      },
    ),
  ),
);`,
      },
      {
        title: 'Snackbar with Close',
        titleKo: '닫기 버튼 스낵바',
        react: `const [visible, setVisible] = useState(false);
const [undone, setUndone] = useState(false);

const showSnackbar = () => {
  setVisible(true);
  setUndone(false);
  setTimeout(() => setVisible(false), 4000);
};

const handleUndo = () => {
  setUndone(true);
  setTimeout(() => { setVisible(false); setUndone(false); }, 1000);
};

<div className="flex flex-col items-start gap-4">
  <button
    onClick={showSnackbar}
    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
  >
    Delete Item
  </button>
  <div className={\`px-4 py-3 bg-neutral-800 text-white text-sm rounded-lg shadow-lg
    flex items-center gap-3 transition-all duration-200
    \${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}\`}>
    <span>{undone ? 'Undone' : 'Item deleted'}</span>
    {!undone && (
      <>
        <button onClick={handleUndo} className="text-blue-400 font-medium hover:text-blue-300">
          Undo
        </button>
        <button onClick={() => setVisible(false)} className="text-neutral-400 hover:text-white">
          ✕
        </button>
      </>
    )}
  </div>
</div>`,
        flutter: `ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Item deleted'),
    action: SnackBarAction(
      label: 'Undo',
      onPressed: () {
        // Undo logic
      },
    ),
    showCloseIcon: true,
  ),
);`,
      },
    ],
  },

  card: {
    snippets: [
      {
        title: 'Elevated Card',
        titleKo: 'Elevated 카드',
        react: `<Card variant="elevated">
  <div className="p-4">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</Card>`,
        flutter: `Card(
  elevation: 1,
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      children: [
        Text('Card Title'),
        Text('Card content'),
      ],
    ),
  ),
)`,
      },
      {
        title: 'Filled Card',
        titleKo: 'Filled 카드',
        react: `<Card variant="filled">
  <div className="p-4">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</Card>`,
        flutter: `Card(
  elevation: 0,
  color: Theme.of(context).colorScheme.surfaceVariant,
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Text('Filled Card'),
  ),
)`,
      },
      {
        title: 'Outlined Card',
        titleKo: 'Outlined 카드',
        react: `<Card variant="outlined">
  <div className="p-4">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</Card>`,
        flutter: `Card(
  elevation: 0,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
    side: BorderSide(
      color: Theme.of(context).colorScheme.outline,
    ),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Text('Outlined Card'),
  ),
)`,
      },
    ],
  },

  dialog: {
    snippets: [
      {
        title: 'Basic Dialog',
        titleKo: '기본 다이얼로그',
        react: `const [open, setOpen] = useState(false);
const [result, setResult] = useState(null);

<div>
  <button
    onClick={() => setOpen(true)}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    Open Dialog
  </button>

  {result && (
    <p className="mt-2 text-sm text-neutral-600">
      Result: {result}
    </p>
  )}

  {open && (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl max-w-sm w-full p-6">
          <h2 className="text-xl font-medium mb-2">Confirm Action</h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">
            Are you sure you want to proceed?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => { setResult('Cancelled'); setOpen(false); }}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => { setResult('Confirmed!'); setOpen(false); }}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  )}
</div>`,
        flutter: `bool _open = false;
String? _result;

ElevatedButton(
  onPressed: () async {
    final result = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Confirm Action'),
        content: Text('Are you sure you want to proceed?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text('Confirm'),
          ),
        ],
      ),
    );
    setState(() => _result = result == true ? 'Confirmed!' : 'Cancelled');
  },
  child: Text('Open Dialog'),
)`,
      },
      {
        title: 'Dialog with Icon',
        titleKo: '아이콘 다이얼로그',
        react: `const [open, setOpen] = useState(false);
const [deleted, setDeleted] = useState(false);

<div>
  <button
    onClick={() => setOpen(true)}
    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
  >
    Delete Item
  </button>

  {deleted && (
    <p className="mt-2 text-sm text-red-600">Item deleted!</p>
  )}

  {open && (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🗑️</span>
          </div>
          <h2 className="text-xl font-medium mb-2">Delete file?</h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">
            This action cannot be undone.
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => { setDeleted(true); setOpen(false); setTimeout(() => setDeleted(false), 2000); }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )}
</div>`,
        flutter: `showDialog(
  context: context,
  builder: (context) => AlertDialog(
    icon: Icon(Icons.delete, color: Colors.red, size: 48),
    title: Text('Delete file?'),
    content: Text('This action cannot be undone.'),
    actions: [
      TextButton(
        onPressed: () => Navigator.pop(context),
        child: Text('Cancel'),
      ),
      FilledButton(
        onPressed: () { Navigator.pop(context); /* delete logic */ },
        style: FilledButton.styleFrom(backgroundColor: Colors.red),
        child: Text('Delete'),
      ),
    ],
  ),
)`,
      },
    ],
  },

  'sheets-bottom': {
    snippets: [
      {
        title: 'Standard Bottom Sheet',
        titleKo: '기본 바텀 시트',
        react: `<BottomSheet open={open} onClosed={() => setOpen(false)}>
  <div className="p-4">
    <h3>Bottom Sheet Title</h3>
    <p>Content goes here</p>
  </div>
</BottomSheet>`,
        flutter: `showBottomSheet(
  context: context,
  builder: (context) => Container(
    padding: EdgeInsets.all(16),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('Bottom Sheet Title'),
        Text('Content goes here'),
      ],
    ),
  ),
);`,
      },
      {
        title: 'Modal Bottom Sheet',
        titleKo: '모달 바텀 시트',
        react: `<BottomSheet open={open} modal onClosed={() => setOpen(false)}>
  <List>
    <ListItem>Share</ListItem>
    <ListItem>Get link</ListItem>
    <ListItem>Delete</ListItem>
  </List>
</BottomSheet>`,
        flutter: `showModalBottomSheet(
  context: context,
  builder: (context) => Column(
    mainAxisSize: MainAxisSize.min,
    children: [
      ListTile(leading: Icon(Icons.share), title: Text('Share')),
      ListTile(leading: Icon(Icons.link), title: Text('Get link')),
      ListTile(leading: Icon(Icons.delete), title: Text('Delete')),
    ],
  ),
);`,
      },
    ],
  },

  tooltip: {
    snippets: [
      {
        title: 'Plain Tooltip',
        titleKo: '기본 툴팁',
        react: `<Tooltip text="Add item">
  <IconButton>
    <Icon>add</Icon>
  </IconButton>
</Tooltip>`,
        flutter: `Tooltip(
  message: 'Add item',
  child: IconButton(
    onPressed: () {},
    icon: Icon(Icons.add),
  ),
)`,
      },
      {
        title: 'Rich Tooltip',
        titleKo: '리치 툴팁',
        react: `<Tooltip>
  <div slot="headline">Rich Tooltip</div>
  <div slot="content">
    This tooltip provides more detail.
  </div>
  <IconButton slot="anchor">
    <Icon>info</Icon>
  </IconButton>
</Tooltip>`,
        flutter: `Tooltip(
  richMessage: TextSpan(
    text: 'Rich Tooltip\\n',
    style: TextStyle(fontWeight: FontWeight.bold),
    children: [
      TextSpan(
        text: 'This tooltip provides more detail.',
        style: TextStyle(fontWeight: FontWeight.normal),
      ),
    ],
  ),
  child: IconButton(
    onPressed: () {},
    icon: Icon(Icons.info),
  ),
)`,
      },
    ],
  },

  'bottom-app-bar': {
    snippets: [
      {
        title: 'Bottom App Bar with FAB',
        titleKo: 'FAB 포함',
        react: `<BottomAppBar>
  <IconButton><Icon>menu</Icon></IconButton>
  <IconButton><Icon>search</Icon></IconButton>
  <Fab slot="fab">
    <Icon slot="icon">add</Icon>
  </Fab>
</BottomAppBar>`,
        flutter: `Scaffold(
  floatingActionButton: FloatingActionButton(
    onPressed: () {},
    child: Icon(Icons.add),
  ),
  floatingActionButtonLocation:
    FloatingActionButtonLocation.centerDocked,
  bottomNavigationBar: BottomAppBar(
    child: Row(
      children: [
        IconButton(icon: Icon(Icons.menu), onPressed: () {}),
        IconButton(icon: Icon(Icons.search), onPressed: () {}),
      ],
    ),
  ),
)`,
      },
      {
        title: 'Bottom App Bar without FAB',
        titleKo: 'FAB 없음',
        react: `<BottomAppBar>
  <IconButton><Icon>check_box</Icon></IconButton>
  <IconButton><Icon>brush</Icon></IconButton>
  <IconButton><Icon>mic</Icon></IconButton>
  <IconButton><Icon>image</Icon></IconButton>
</BottomAppBar>`,
        flutter: `BottomAppBar(
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceAround,
    children: [
      IconButton(icon: Icon(Icons.check_box), onPressed: () {}),
      IconButton(icon: Icon(Icons.brush), onPressed: () {}),
      IconButton(icon: Icon(Icons.mic), onPressed: () {}),
      IconButton(icon: Icon(Icons.image), onPressed: () {}),
    ],
  ),
)`,
      },
    ],
  },

  'navigation-bar': {
    snippets: [
      {
        title: 'Basic Navigation Bar',
        titleKo: '기본 네비게이션 바',
        react: `<NavigationBar activeIndex={activeIndex} onActiveIndexChange={setActiveIndex}>
  <NavigationTab>
    <Icon slot="icon">home</Icon>
    Home
  </NavigationTab>
  <NavigationTab>
    <Icon slot="icon">explore</Icon>
    Explore
  </NavigationTab>
  <NavigationTab>
    <Icon slot="icon">person</Icon>
    Profile
  </NavigationTab>
</NavigationBar>`,
        flutter: `NavigationBar(
  selectedIndex: _selectedIndex,
  onDestinationSelected: (index) {
    setState(() => _selectedIndex = index);
  },
  destinations: [
    NavigationDestination(
      icon: Icon(Icons.home_outlined),
      selectedIcon: Icon(Icons.home),
      label: 'Home',
    ),
    NavigationDestination(
      icon: Icon(Icons.explore_outlined),
      selectedIcon: Icon(Icons.explore),
      label: 'Explore',
    ),
    NavigationDestination(
      icon: Icon(Icons.person_outline),
      selectedIcon: Icon(Icons.person),
      label: 'Profile',
    ),
  ],
)`,
      },
      {
        title: 'Navigation Bar with Badge',
        titleKo: '배지 포함',
        react: `<NavigationBar>
  <NavigationTab>
    <Icon slot="icon">home</Icon>
    Home
  </NavigationTab>
  <NavigationTab>
    <Badge value={3} slot="icon">
      <Icon>notifications</Icon>
    </Badge>
    Notifications
  </NavigationTab>
</NavigationBar>`,
        flutter: `NavigationBar(
  destinations: [
    NavigationDestination(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    NavigationDestination(
      icon: Badge(
        label: Text('3'),
        child: Icon(Icons.notifications),
      ),
      label: 'Notifications',
    ),
  ],
)`,
      },
    ],
  },

  'navigation-drawer': {
    snippets: [
      {
        title: 'Standard Drawer',
        titleKo: '기본 드로어',
        react: `<NavigationDrawer open={open}>
  <NavigationDrawerItem selected>
    <Icon slot="icon">inbox</Icon>
    Inbox
  </NavigationDrawerItem>
  <NavigationDrawerItem>
    <Icon slot="icon">send</Icon>
    Sent
  </NavigationDrawerItem>
  <NavigationDrawerItem>
    <Icon slot="icon">delete</Icon>
    Trash
  </NavigationDrawerItem>
</NavigationDrawer>`,
        flutter: `Drawer(
  child: ListView(
    children: [
      DrawerHeader(child: Text('Mail')),
      ListTile(
        leading: Icon(Icons.inbox),
        title: Text('Inbox'),
        selected: true,
        onTap: () {},
      ),
      ListTile(
        leading: Icon(Icons.send),
        title: Text('Sent'),
        onTap: () {},
      ),
      ListTile(
        leading: Icon(Icons.delete),
        title: Text('Trash'),
        onTap: () {},
      ),
    ],
  ),
)`,
      },
      {
        title: 'Modal Drawer',
        titleKo: '모달 드로어',
        react: `<NavigationDrawer open={open} modal onClosed={() => setOpen(false)}>
  <div slot="headline">Mail</div>
  <NavigationDrawerItem>
    <Icon slot="icon">inbox</Icon>
    Inbox
    <span slot="badge">24</span>
  </NavigationDrawerItem>
</NavigationDrawer>`,
        flutter: `Scaffold(
  drawer: NavigationDrawer(
    selectedIndex: _selectedIndex,
    onDestinationSelected: (index) {
      setState(() => _selectedIndex = index);
    },
    children: [
      NavigationDrawerDestination(
        icon: Badge(label: Text('24'), child: Icon(Icons.inbox)),
        label: Text('Inbox'),
      ),
    ],
  ),
)`,
      },
    ],
  },

  tabs: {
    snippets: [
      {
        title: 'Primary Tabs',
        titleKo: '기본 탭',
        react: `const [activeTab, setActiveTab] = useState(0);
const tabs = ['Flights', 'Trips', 'Explore'];
const tabContent = [
  'Search for flights to your destination',
  'View and manage your upcoming trips',
  'Discover new destinations to visit',
];

<div>
  <div className="flex border-b border-neutral-200">
    {tabs.map((tab, i) => (
      <button
        key={i}
        onClick={() => setActiveTab(i)}
        className={\`px-6 py-3 text-sm font-medium transition-colors relative
          \${activeTab === i ? 'text-blue-600' : 'text-neutral-600 hover:text-neutral-800'}\`}
      >
        {tab}
        {activeTab === i && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
        )}
      </button>
    ))}
  </div>
  <div className="p-4 text-sm text-neutral-600">
    {tabContent[activeTab]}
  </div>
</div>`,
        flutter: `int _activeTab = 0;
final tabs = ['Flights', 'Trips', 'Explore'];

TabBar(
  controller: _tabController,
  onTap: (index) => setState(() => _activeTab = index),
  tabs: tabs.map((tab) => Tab(text: tab)).toList(),
)`,
      },
      {
        title: 'Secondary Tabs',
        titleKo: '보조 탭',
        react: `const [activeTab, setActiveTab] = useState(0);
const tabs = ['Overview', 'Specifications', 'Reviews'];
const tabContent = [
  'Product overview and highlights',
  'Detailed specifications',
  'Customer reviews and ratings',
];

<div>
  <div className="flex gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
    {tabs.map((tab, i) => (
      <button
        key={i}
        onClick={() => setActiveTab(i)}
        className={\`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors
          \${activeTab === i
            ? 'bg-white dark:bg-neutral-700 text-blue-600 shadow-sm'
            : 'text-neutral-600 hover:text-neutral-800'}\`}
      >
        {tab}
      </button>
    ))}
  </div>
  <div className="p-4 text-sm text-neutral-600 dark:text-neutral-300">
    {tabContent[activeTab]}
  </div>
</div>`,
        flutter: `int _activeTab = 0;

TabBar.secondary(
  controller: _tabController,
  tabs: [
    Tab(text: 'Overview'),
    Tab(text: 'Specifications'),
    Tab(text: 'Reviews'),
  ],
)`,
      },
      {
        title: 'Tabs with Icons',
        titleKo: '아이콘 탭',
        react: `const [activeTab, setActiveTab] = useState(0);
const tabs = [
  { icon: '✈️', label: 'Flights' },
  { icon: '🧭', label: 'Explore' },
  { icon: '🏨', label: 'Hotels' },
];

<div className="flex border-b border-neutral-200">
  {tabs.map((tab, i) => (
    <button
      key={i}
      onClick={() => setActiveTab(i)}
      className={\`flex flex-col items-center gap-1 px-6 py-3 text-sm font-medium transition-colors relative
        \${activeTab === i ? 'text-blue-600' : 'text-neutral-600 hover:text-neutral-800'}\`}
    >
      <span>{tab.icon}</span>
      <span>{tab.label}</span>
      {activeTab === i && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
      )}
    </button>
  ))}
</div>`,
        flutter: `TabBar(
  controller: _tabController,
  tabs: [
    Tab(icon: Icon(Icons.flight), text: 'Flights'),
    Tab(icon: Icon(Icons.explore), text: 'Explore'),
    Tab(icon: Icon(Icons.hotel), text: 'Hotels'),
  ],
)`,
      },
    ],
  },

  'top-app-bar': {
    snippets: [
      {
        title: 'Center-aligned',
        titleKo: '중앙 정렬',
        react: `<TopAppBar>
  <IconButton slot="leading"><Icon>menu</Icon></IconButton>
  <span slot="headline">Page Title</span>
  <IconButton slot="trailing"><Icon>account_circle</Icon></IconButton>
</TopAppBar>`,
        flutter: `AppBar(
  leading: IconButton(
    icon: Icon(Icons.menu),
    onPressed: () {},
  ),
  title: Text('Page Title'),
  centerTitle: true,
  actions: [
    IconButton(
      icon: Icon(Icons.account_circle),
      onPressed: () {},
    ),
  ],
)`,
      },
      {
        title: 'Small Top App Bar',
        titleKo: '작은 앱 바',
        react: `<TopAppBar variant="small">
  <IconButton slot="leading"><Icon>arrow_back</Icon></IconButton>
  <span slot="headline">Details</span>
</TopAppBar>`,
        flutter: `AppBar(
  leading: IconButton(
    icon: Icon(Icons.arrow_back),
    onPressed: () => Navigator.pop(context),
  ),
  title: Text('Details'),
)`,
      },
      {
        title: 'Medium Top App Bar',
        titleKo: '중간 앱 바',
        react: `<TopAppBar variant="medium">
  <IconButton slot="leading"><Icon>arrow_back</Icon></IconButton>
  <span slot="headline">Medium Title</span>
</TopAppBar>`,
        flutter: `SliverAppBar.medium(
  leading: IconButton(
    icon: Icon(Icons.arrow_back),
    onPressed: () {},
  ),
  title: Text('Medium Title'),
)`,
      },
    ],
  },

  checkbox: {
    snippets: [
      {
        title: 'Basic Checkbox',
        titleKo: '기본 체크박스',
        react: `const [checked, setChecked] = useState(false);

<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    className="w-5 h-5 rounded accent-blue-600"
  />
  <span>{checked ? 'Checked' : 'Unchecked'}</span>
</label>`,
        flutter: `bool isChecked = false;

Checkbox(
  value: isChecked,
  onChanged: (value) {
    setState(() => isChecked = value!);
  },
)`,
      },
      {
        title: 'Checkbox with Label',
        titleKo: '라벨 체크박스',
        react: `const [agreed, setAgreed] = useState(false);

<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    className="w-5 h-5 rounded accent-blue-600"
  />
  <span>Accept terms and conditions</span>
</label>`,
        flutter: `bool isAgreed = false;

CheckboxListTile(
  value: isAgreed,
  onChanged: (value) {
    setState(() => isAgreed = value!);
  },
  title: Text('Accept terms and conditions'),
)`,
      },
      {
        title: 'Indeterminate Checkbox',
        titleKo: '불확정 체크박스',
        react: `const [items, setItems] = useState([false, false, false]);
const allChecked = items.every(Boolean);
const someChecked = items.some(Boolean);

<div className="space-y-2">
  <label className="flex items-center gap-3 cursor-pointer">
    <input
      type="checkbox"
      checked={allChecked}
      ref={(el) => { if (el) el.indeterminate = someChecked && !allChecked; }}
      onChange={() => setItems(allChecked ? [false, false, false] : [true, true, true])}
      className="w-5 h-5 rounded accent-blue-600"
    />
    <span className="font-medium">Select All</span>
  </label>
  <div className="ml-6 space-y-1">
    {items.map((checked, i) => (
      <label key={i} className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            const newItems = [...items];
            newItems[i] = e.target.checked;
            setItems(newItems);
          }}
          className="w-4 h-4 rounded accent-blue-600"
        />
        <span>Option {i + 1}</span>
      </label>
    ))}
  </div>
</div>`,
        flutter: `List<bool> items = [false, false, false];
bool get allChecked => items.every((e) => e);
bool get someChecked => items.any((e) => e);

Column(
  children: [
    CheckboxListTile(
      tristate: true,
      value: allChecked ? true : (someChecked ? null : false),
      onChanged: (value) {
        setState(() {
          items = List.filled(3, value ?? false);
        });
      },
      title: Text('Select All'),
    ),
    ...items.asMap().entries.map((e) => CheckboxListTile(
      value: e.value,
      onChanged: (value) {
        setState(() => items[e.key] = value!);
      },
      title: Text('Option \${e.key + 1}'),
    )),
  ],
)`,
      },
    ],
  },

  chips: {
    snippets: [
      {
        title: 'Assist Chip',
        titleKo: 'Assist 칩',
        react: `const [clicked, setClicked] = useState(false);

<button
  onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 1000); }}
  className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
    \${clicked ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 hover:bg-slate-200'}\`}
>
  <CalendarIcon className="w-4 h-4" />
  {clicked ? 'Alarm set!' : 'Set alarm'}
</button>`,
        flutter: `bool _clicked = false;

ActionChip(
  avatar: Icon(Icons.event),
  label: Text(_clicked ? 'Alarm set!' : 'Set alarm'),
  backgroundColor: _clicked ? Colors.blue.shade100 : null,
  onPressed: () {
    setState(() => _clicked = true);
    Future.delayed(Duration(seconds: 1), () {
      setState(() => _clicked = false);
    });
  },
)`,
      },
      {
        title: 'Filter Chip',
        titleKo: 'Filter 칩',
        react: `const [selected, setSelected] = useState(false);

<button
  onClick={() => setSelected(!selected)}
  className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
    \${selected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 hover:bg-slate-200'}\`}
>
  {selected && <CheckIcon className="w-4 h-4" />}
  Vegetarian
</button>`,
        flutter: `bool _selected = false;

FilterChip(
  label: Text('Vegetarian'),
  selected: _selected,
  onSelected: (selected) {
    setState(() => _selected = selected);
  },
)`,
      },
      {
        title: 'Input Chip',
        titleKo: 'Input 칩',
        react: `const [visible, setVisible] = useState(true);

{visible ? (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-sm">
    John Doe
    <button
      onClick={() => setVisible(false)}
      className="w-4 h-4 flex items-center justify-center hover:bg-neutral-300 rounded-full"
    >
      ×
    </button>
  </div>
) : (
  <button
    onClick={() => setVisible(true)}
    className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-neutral-500"
  >
    + Add back
  </button>
)}`,
        flutter: `bool _visible = true;

_visible
  ? InputChip(
      label: Text('John Doe'),
      onDeleted: () => setState(() => _visible = false),
    )
  : ActionChip(
      label: Text('+ Add back'),
      onPressed: () => setState(() => _visible = true),
    )`,
      },
      {
        title: 'Suggestion Chip',
        titleKo: 'Suggestion 칩',
        react: `const [searching, setSearching] = useState(false);

<button
  onClick={() => { setSearching(true); setTimeout(() => setSearching(false), 1500); }}
  className={\`px-3 py-1.5 rounded-lg text-sm transition-colors
    \${searching ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 hover:bg-slate-200'}\`}
>
  {searching ? 'Searching...' : 'Try "weather today"'}
</button>`,
        flutter: `bool _searching = false;

ActionChip(
  label: Text(_searching ? 'Searching...' : 'Try "weather today"'),
  backgroundColor: _searching ? Colors.blue.shade100 : null,
  onPressed: () {
    setState(() => _searching = true);
    Future.delayed(Duration(milliseconds: 1500), () {
      setState(() => _searching = false);
    });
  },
)`,
      },
    ],
  },

  'date-pickers': {
    snippets: [
      {
        title: 'Date Picker',
        titleKo: '날짜 선택',
        react: `const [selectedDate, setSelectedDate] = useState(15);
const [currentMonth, setCurrentMonth] = useState(0);
const [currentYear, setCurrentYear] = useState(2025);

const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const daysInMonth = getDaysInMonth(currentMonth, currentYear);
const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

<div className="w-72 bg-white rounded-xl shadow-lg p-4">
  <div className="flex items-center justify-between mb-4">
    <button onClick={() => setCurrentMonth(m => m === 0 ? 11 : m - 1)}>◀</button>
    <span className="font-medium">{months[currentMonth]} {currentYear}</span>
    <button onClick={() => setCurrentMonth(m => m === 11 ? 0 : m + 1)}>▶</button>
  </div>
  <div className="grid grid-cols-7 gap-1 text-center text-xs">
    {days.map((d, i) => <div key={i} className="py-1 text-neutral-500">{d}</div>)}
    {[...Array(firstDay)].map((_, i) => <div key={\`empty-\${i}\`} />)}
    {[...Array(daysInMonth)].map((_, i) => (
      <button
        key={i}
        onClick={() => setSelectedDate(i + 1)}
        className={\`py-1.5 rounded-full \${i + 1 === selectedDate
          ? 'bg-blue-600 text-white'
          : 'hover:bg-neutral-100'}\`}
      >
        {i + 1}
      </button>
    ))}
  </div>
</div>`,
        flutter: `DateTime _selectedDate = DateTime.now();

Future<void> _selectDate(BuildContext context) async {
  final DateTime? picked = await showDatePicker(
    context: context,
    initialDate: _selectedDate,
    firstDate: DateTime(2000),
    lastDate: DateTime(2100),
  );
  if (picked != null && picked != _selectedDate) {
    setState(() => _selectedDate = picked);
  }
}`,
      },
      {
        title: 'Modal Date Picker',
        titleKo: '모달 날짜 선택',
        react: `const [selectedDate, setSelectedDate] = useState(15);
const [currentMonth, setCurrentMonth] = useState(0);
const [currentYear, setCurrentYear] = useState(2025);

const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const getFormattedDate = () => {
  const date = new Date(currentYear, currentMonth, selectedDate);
  const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  return \`\${dayName}, \${months[currentMonth].slice(0, 3)} \${selectedDate}\`;
};

<div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden">
  <div className="bg-blue-600 p-4 text-white">
    <div className="text-sm opacity-80">SELECT DATE</div>
    <div className="text-2xl font-medium mt-1">{getFormattedDate()}</div>
  </div>
  <div className="p-4">
    <div className="flex items-center justify-between mb-3">
      <button onClick={() => setCurrentMonth(m => m === 0 ? 11 : m - 1)}>◀</button>
      <span className="text-sm">{months[currentMonth]} {currentYear}</span>
      <button onClick={() => setCurrentMonth(m => m === 11 ? 0 : m + 1)}>▶</button>
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs">
      {days.map((d, i) => <div key={i} className="py-1 text-neutral-500">{d}</div>)}
      {[...Array(getFirstDayOfMonth(currentMonth, currentYear))].map((_, i) => (
        <div key={\`empty-\${i}\`} />
      ))}
      {[...Array(getDaysInMonth(currentMonth, currentYear))].map((_, i) => (
        <button
          key={i}
          onClick={() => setSelectedDate(i + 1)}
          className={\`py-1.5 rounded-full \${i + 1 === selectedDate
            ? 'bg-blue-600 text-white'
            : 'hover:bg-neutral-100'}\`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
</div>`,
        flutter: `DateTime _selectedDate = DateTime.now();

Future<void> _selectDate(BuildContext context) async {
  final DateTime? picked = await showDatePicker(
    context: context,
    initialDate: _selectedDate,
    firstDate: DateTime(2000),
    lastDate: DateTime(2100),
    builder: (context, child) {
      return Theme(
        data: Theme.of(context).copyWith(
          colorScheme: ColorScheme.light(primary: Colors.blue),
        ),
        child: child!,
      );
    },
  );
  if (picked != null) {
    setState(() => _selectedDate = picked);
  }
}`,
      },
    ],
  },

  menus: {
    snippets: [
      {
        title: 'Basic Menu',
        titleKo: '기본 메뉴',
        react: `const [open, setOpen] = useState(false);
const [selected, setSelected] = useState(null);

const handleItemClick = (action) => {
  setSelected(action);
  setOpen(false);
  setTimeout(() => setSelected(null), 1500);
};

<div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
  >
    Open Menu
    <span className={\`transition-transform \${open ? 'rotate-180' : ''}\`}>▼</span>
  </button>
  {selected && (
    <div className="absolute top-full mt-2 px-3 py-1.5 bg-neutral-800 text-white text-sm rounded-lg">
      {selected}
    </div>
  )}
  {open && (
    <>
      <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
        <button onClick={() => handleItemClick('Cut')}
          className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 flex items-center gap-3">
          <CutIcon className="w-4 h-4" />Cut
        </button>
        <button onClick={() => handleItemClick('Copy')}
          className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 flex items-center gap-3">
          <CopyIcon className="w-4 h-4" />Copy
        </button>
        <button onClick={() => handleItemClick('Paste')}
          className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 flex items-center gap-3">
          <PasteIcon className="w-4 h-4" />Paste
        </button>
      </div>
    </>
  )}
</div>`,
        flutter: `bool _open = false;
String? _selected;

PopupMenuButton<String>(
  onSelected: (value) {
    setState(() => _selected = value);
    Future.delayed(Duration(milliseconds: 1500), () {
      setState(() => _selected = null);
    });
  },
  itemBuilder: (context) => [
    PopupMenuItem(
      value: 'cut',
      child: ListTile(leading: Icon(Icons.cut), title: Text('Cut')),
    ),
    PopupMenuItem(
      value: 'copy',
      child: ListTile(leading: Icon(Icons.copy), title: Text('Copy')),
    ),
    PopupMenuItem(
      value: 'paste',
      child: ListTile(leading: Icon(Icons.paste), title: Text('Paste')),
    ),
  ],
)`,
      },
      {
        title: 'Menu with Divider',
        titleKo: '구분선 메뉴',
        react: `const [open, setOpen] = useState(false);

<div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
  >
    Settings
    <span className={\`transition-transform \${open ? 'rotate-180' : ''}\`}>▼</span>
  </button>
  {open && (
    <>
      <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
        <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100">
          Profile
        </button>
        <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100">
          Settings
        </button>
        <div className="border-t border-neutral-200 my-1" />
        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
          Logout
        </button>
      </div>
    </>
  )}
</div>`,
        flutter: `PopupMenuButton<String>(
  itemBuilder: (context) => [
    PopupMenuItem(value: 'profile', child: Text('Profile')),
    PopupMenuItem(value: 'settings', child: Text('Settings')),
    PopupMenuDivider(),
    PopupMenuItem(
      value: 'logout',
      child: Text('Logout', style: TextStyle(color: Colors.red)),
    ),
  ],
)`,
      },
    ],
  },

  'radio-button': {
    snippets: [
      {
        title: 'Radio Group',
        titleKo: '라디오 그룹',
        react: `const [selected, setSelected] = useState('small');
const options = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

<div role="radiogroup" className="space-y-2">
  {options.map((option) => (
    <label
      key={option.value}
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => setSelected(option.value)}
    >
      <div className={\`w-5 h-5 rounded-full border-2 flex items-center justify-center
        \${selected === option.value ? 'border-blue-600' : 'border-neutral-400'}\`}>
        {selected === option.value && (
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
        )}
      </div>
      <span>{option.label}</span>
    </label>
  ))}
</div>`,
        flutter: `Column(
  children: [
    RadioListTile<String>(
      title: Text('Small'),
      value: 'small',
      groupValue: _size,
      onChanged: (value) {
        setState(() => _size = value!);
      },
    ),
    RadioListTile<String>(
      title: Text('Medium'),
      value: 'medium',
      groupValue: _size,
      onChanged: (value) {
        setState(() => _size = value!);
      },
    ),
  ],
)`,
      },
    ],
  },

  slider: {
    snippets: [
      {
        title: 'Continuous Slider',
        titleKo: '연속 슬라이더',
        react: `const [value, setValue] = useState(50);

<div className="w-48">
  <div className="flex justify-between text-xs text-neutral-500 mb-1">
    <span>Value</span>
    <span>{value}</span>
  </div>
  <input
    type="range"
    className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    value={value}
    onChange={(e) => setValue(Number(e.target.value))}
  />
</div>`,
        flutter: `double _value = 50;

Column(
  children: [
    Text('Value: \${_value.round()}'),
    Slider(
      value: _value,
      min: 0,
      max: 100,
      onChanged: (value) {
        setState(() => _value = value);
      },
    ),
  ],
)`,
      },
      {
        title: 'Discrete Slider',
        titleKo: '단계 슬라이더',
        react: `const [value, setValue] = useState(50);

<div className="w-48 flex flex-col items-center">
  <div className="flex justify-between w-full text-xs text-neutral-500 mb-1">
    <span>Step</span>
    <span>{value}</span>
  </div>
  <input
    type="range"
    className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    step={25}
    value={value}
    onChange={(e) => setValue(Number(e.target.value))}
  />
  <div className="flex justify-between w-full text-xs text-neutral-400 mt-1">
    <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
  </div>
</div>`,
        flutter: `double _value = 50;

Column(
  children: [
    Text('Step: \${_value.round()}'),
    Slider(
      value: _value,
      min: 0,
      max: 100,
      divisions: 4,
      label: _value.round().toString(),
      onChanged: (value) {
        setState(() => _value = value);
      },
    ),
  ],
)`,
      },
      {
        title: 'Range Slider',
        titleKo: '범위 슬라이더',
        react: `const [rangeStart, setRangeStart] = useState(25);
const [rangeEnd, setRangeEnd] = useState(75);

<div className="w-48">
  <div className="flex justify-between text-xs text-neutral-500 mb-1">
    <span>Range</span>
    <span>{rangeStart} - {rangeEnd}</span>
  </div>
  <div className="relative h-6 flex items-center">
    <div className="absolute w-full h-1 bg-blue-200 rounded-lg" />
    <div
      className="absolute h-1 bg-blue-600 rounded-lg"
      style={{ left: \`\${rangeStart}%\`, right: \`\${100 - rangeEnd}%\` }}
    />
    <input type="range" value={rangeStart}
      onChange={(e) => setRangeStart(Math.min(Number(e.target.value), rangeEnd - 10))}
      className="absolute w-full appearance-none bg-transparent cursor-pointer" />
    <input type="range" value={rangeEnd}
      onChange={(e) => setRangeEnd(Math.max(Number(e.target.value), rangeStart + 10))}
      className="absolute w-full appearance-none bg-transparent cursor-pointer" />
  </div>
</div>`,
        flutter: `RangeValues _rangeValues = RangeValues(25, 75);

Column(
  children: [
    Text('Range: \${_rangeValues.start.round()} - \${_rangeValues.end.round()}'),
    RangeSlider(
      values: _rangeValues,
      min: 0,
      max: 100,
      onChanged: (values) {
        setState(() => _rangeValues = values);
      },
    ),
  ],
)`,
      },
    ],
  },

  switch: {
    snippets: [
      {
        title: 'Basic Switch',
        titleKo: '기본 스위치',
        react: `const [enabled, setEnabled] = useState(false);

<div
  onClick={() => setEnabled(!enabled)}
  className={\`w-12 h-7 rounded-full relative cursor-pointer transition-colors
    \${enabled ? 'bg-blue-600' : 'bg-neutral-300'}\`}
>
  <div className={\`absolute top-1 w-5 h-5 bg-white rounded-full shadow
    transition-all \${enabled ? 'right-1' : 'left-1'}\`} />
</div>`,
        flutter: `bool _enabled = false;

Switch(
  value: _enabled,
  onChanged: (value) {
    setState(() => _enabled = value);
  },
)`,
      },
      {
        title: 'Switch with Label',
        titleKo: '라벨 스위치',
        react: `const [notifications, setNotifications] = useState(true);

<label className="flex items-center gap-3 cursor-pointer">
  <div
    onClick={() => setNotifications(!notifications)}
    className={\`w-12 h-7 rounded-full relative cursor-pointer transition-colors
      \${notifications ? 'bg-blue-600' : 'bg-neutral-300'}\`}
  >
    <div className={\`absolute top-1 w-5 h-5 bg-white rounded-full shadow
      transition-all \${notifications ? 'right-1' : 'left-1'}\`} />
  </div>
  <span>Enable notifications</span>
</label>`,
        flutter: `bool _notifications = true;

SwitchListTile(
  title: Text('Enable notifications'),
  value: _notifications,
  onChanged: (value) {
    setState(() => _notifications = value);
  },
)`,
      },
      {
        title: 'Switch with Icons',
        titleKo: '아이콘 스위치',
        react: `const [withIcon, setWithIcon] = useState(false);

<div
  onClick={() => setWithIcon(!withIcon)}
  className={\`w-12 h-7 rounded-full relative cursor-pointer transition-colors
    \${withIcon ? 'bg-blue-600' : 'bg-neutral-300'}\`}
>
  <div className={\`absolute top-1 w-5 h-5 bg-white rounded-full shadow
    transition-all flex items-center justify-center
    \${withIcon ? 'right-1' : 'left-1'}\`}>
    {withIcon && <span className="text-xs text-blue-600">✓</span>}
  </div>
</div>`,
        flutter: `bool _withIcon = false;

Switch(
  value: _withIcon,
  thumbIcon: WidgetStateProperty.resolveWith((states) {
    if (states.contains(WidgetState.selected)) {
      return Icon(Icons.check);
    }
    return null;
  }),
  onChanged: (value) {
    setState(() => _withIcon = value);
  },
)`,
      },
    ],
  },

  'text-field': {
    snippets: [
      {
        title: 'Filled Text Field',
        titleKo: 'Filled 텍스트 필드',
        react: `const [value, setValue] = useState('');

<div className="w-64">
  <div className={\`bg-slate-100 rounded-t-lg px-4 pt-4 pb-2 border-b-2
    \${value ? 'border-blue-600' : 'border-neutral-400'}\`}>
    <label className={\`text-xs \${value ? 'text-blue-600' : 'text-neutral-500'}\`}>
      Label
    </label>
    <input
      className="w-full bg-transparent outline-none"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter text"
    />
  </div>
</div>`,
        flutter: `String _value = '';

TextField(
  decoration: InputDecoration(
    filled: true,
    labelText: 'Label',
  ),
  onChanged: (value) {
    setState(() => _value = value);
  },
)`,
      },
      {
        title: 'Outlined Text Field',
        titleKo: 'Outlined 텍스트 필드',
        react: `const [value, setValue] = useState('');

<div className="w-64">
  <div className={\`relative border-2 rounded-lg px-4 py-3
    \${value ? 'border-blue-600' : 'border-neutral-300'}\`}>
    <label className={\`absolute -top-2.5 left-3 px-1 bg-white text-xs
      \${value ? 'text-blue-600' : 'text-neutral-500'}\`}>
      Label
    </label>
    <input
      className="w-full bg-transparent outline-none"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter text"
    />
  </div>
</div>`,
        flutter: `String _value = '';

TextField(
  decoration: InputDecoration(
    border: OutlineInputBorder(),
    labelText: 'Label',
  ),
  onChanged: (value) {
    setState(() => _value = value);
  },
)`,
      },
      {
        title: 'Text Field with Helper',
        titleKo: '도움말 텍스트 필드',
        react: `const [email, setEmail] = useState('');

<div className="w-64">
  <div className="relative border-2 border-neutral-300 rounded-lg px-4 py-3
    focus-within:border-blue-600">
    <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs text-neutral-500">
      Email
    </label>
    <input
      className="w-full bg-transparent outline-none"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter email"
    />
  </div>
  <p className="text-xs text-neutral-500 mt-1 px-4">
    We'll never share your email
  </p>
</div>`,
        flutter: `String _email = '';

TextField(
  decoration: InputDecoration(
    labelText: 'Email',
    helperText: 'We\\'ll never share your email',
  ),
  onChanged: (value) {
    setState(() => _email = value);
  },
)`,
      },
      {
        title: 'Text Field with Error',
        titleKo: '에러 텍스트 필드',
        react: `const [password, setPassword] = useState('');
const hasError = password.length > 0 && password.length < 8;

<div className="w-64">
  <div className={\`bg-slate-100 rounded-t-lg px-4 pt-4 pb-2 border-b-2
    \${hasError ? 'border-red-600' : 'border-blue-600'}\`}>
    <label className={\`text-xs \${hasError ? 'text-red-600' : 'text-blue-600'}\`}>
      Password
    </label>
    <input
      type="password"
      className="w-full bg-transparent outline-none"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  {hasError && (
    <p className="text-xs text-red-600 mt-1 px-4">
      Password must be at least 8 characters
    </p>
  )}
</div>`,
        flutter: `String _password = '';
bool get hasError => _password.isNotEmpty && _password.length < 8;

TextField(
  obscureText: true,
  decoration: InputDecoration(
    labelText: 'Password',
    errorText: hasError ? 'Password must be at least 8 characters' : null,
  ),
  onChanged: (value) {
    setState(() => _password = value);
  },
)`,
      },
      {
        title: 'Text Field with Icons',
        titleKo: '아이콘 텍스트 필드',
        react: `const [search, setSearch] = useState('');

<div className="w-64">
  <div className="relative border-2 border-neutral-300 rounded-lg px-4 py-3
    flex items-center gap-2 focus-within:border-blue-600">
    <SearchIcon className="w-5 h-5 text-neutral-400" />
    <input
      className="flex-1 bg-transparent outline-none"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
    {search && (
      <button
        className="text-neutral-400 hover:text-neutral-600"
        onClick={() => setSearch('')}
      >
        ✕
      </button>
    )}
  </div>
</div>`,
        flutter: `String _search = '';

TextField(
  decoration: InputDecoration(
    hintText: 'Search...',
    prefixIcon: Icon(Icons.search),
    suffixIcon: _search.isNotEmpty
      ? IconButton(
          icon: Icon(Icons.close),
          onPressed: () => setState(() => _search = ''),
        )
      : null,
  ),
  onChanged: (value) {
    setState(() => _search = value);
  },
)`,
      },
    ],
  },
};
