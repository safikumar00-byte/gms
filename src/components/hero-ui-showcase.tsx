import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import React, { useDeferredValue, useMemo, useState } from 'react';
import { Pressable, ScrollView, View, Text } from 'react-native';

import {
  Accordion,
  Alert,
  Avatar,
  BottomSheet,
  Button,
  Card,
  Checkbox,
  Chip,
  ControlField,
  Description,
  Dialog,
  FieldError,
  Input,
  InputGroup,
  InputOTP,
  Label,
  ListGroup,
  Menu,
  Popover,
  PressableFeedback,
  Radio,
  RadioGroup,
  ScrollShadow,
  SearchField,
  Select,
  Separator,
  Skeleton,
  SkeletonGroup,
  Slider,
  Spinner,
  Surface,
  Switch,
  Tabs,
  TagGroup,
  TextArea,
  TextField,
  Toast,
  useToast,
} from 'heroui-native';

type ShowcaseTab = 'overview' | 'forms' | 'navigation' | 'overlays';

const TEAM_OPTIONS = [
  { value: 'design', label: 'Design' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'platform', label: 'Platform' },
];

const LIST_ITEMS = [
  { id: 'profile', title: 'Profile', description: 'Avatar, bio, and personal details', emoji: '🙂' },
  { id: 'billing', title: 'Billing', description: 'Invoices, cards, and subscriptions', emoji: '💳' },
  { id: 'security', title: 'Security', description: '2FA, devices, and passkeys', emoji: '🔐' },
];

const FAQ_ITEMS = [
  {
    id: '1',
    title: 'How is HeroUI wired into this app?',
    content: 'The root layout now mounts HeroUI Native inside Gesture Handler and Uniwind, so className-driven components render correctly across the project.',
  },
  {
    id: '2',
    title: 'What does this gallery cover?',
    content: 'It demonstrates HeroUI buttons, forms, overlays, layout primitives, utilities, and feedback patterns with real state and interactions.',
  },
  {
    id: '3',
    title: 'How should we extend it next?',
    content: 'Treat each card as a reference pattern. As product screens are built, pull the relevant component pattern into feature-specific modules.',
  },
];

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <View className="gap-1">
      <Text className="text-xl font-semibold text-foreground">{title}</Text>
      <Text className="text-sm leading-5 text-muted">{description}</Text>
    </View>
  );
}

function TextLink({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
    >
      <Text className="text-sm font-medium text-accent underline">{children}</Text>
    </Pressable>
  );
}

export default function HeroUIShowcase() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<ShowcaseTab>('overview');
  const [email, setEmail] = useState('sunil@example.com');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [otp, setOtp] = useState('');
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [team, setTeam] = useState<(typeof TEAM_OPTIONS)[number] | undefined>(TEAM_OPTIONS[1]);
  const [shipMode, setShipMode] = useState('express');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [volume, setVolume] = useState(56);
  const [range, setRange] = useState<number[]>([200, 800]);
  const [menuSelection, setMenuSelection] = useState<Set<string>>(new Set(['grid']));
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(['mobile', 'design']));
  const [tags, setTags] = useState([
    { id: 'mobile', label: 'Mobile' },
    { id: 'design', label: 'Design' },
    { id: 'growth', label: 'Growth' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoadingCard, setIsLoadingCard] = useState(true);

  const filteredItems = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) return LIST_ITEMS;
    return LIST_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );
  }, [deferredSearch]);

  const emailInvalid = email.length > 0 && !email.includes('@');
  const notesInvalid = notes.length > 0 && notes.length < 16;
  const tagInvalid = selectedTags.size === 0;

  return (
    <View className="gap-6">
      <Surface variant="secondary" className="gap-4">
        <View className="flex-row items-start justify-between gap-4">
          <View className="flex-1 gap-3">
            <View className="flex-row flex-wrap items-center gap-2">
              <Chip variant="soft" color="accent">
                <Chip.Label>HeroUI Native</Chip.Label>
              </Chip>
              <Chip variant="secondary" color="success">
                <Chip.Label>Installed</Chip.Label>
              </Chip>
              <Chip variant="secondary" color="warning">
                <Chip.Label>Interactive Demo</Chip.Label>
              </Chip>
            </View>
            <View className="gap-2">
              <Text className="text-3xl font-semibold tracking-tight text-foreground">
                Component rollout across the project
              </Text>
              <Text className="max-w-3xl text-base leading-7 text-muted">
                This screen now acts as a living HeroUI reference for buttons, forms,
                navigation patterns, overlays, and feedback states inside your Expo app.
              </Text>
            </View>
            <View className="flex-row flex-wrap items-center gap-3">
              <Button onPress={() => setActiveTab('forms')}>Open form components</Button>
              <Button variant="secondary" onPress={() => setActiveTab('overlays')}>
                Review overlays
              </Button>
              <TextLink
                onPress={() =>
                  toast.show({
                    variant: 'accent',
                    label: 'HeroUI is active',
                    description: 'The provider, styles, and demo components are now wired into the app.',
                  })
                }
              >
                See toast pattern
              </TextLink>
            </View>
          </View>

          <Card className="w-36 gap-4 self-stretch">
            <Card.Header className="items-center">
              <Avatar size="lg" color="accent" alt="Project avatar">
                <Avatar.Image source={{ uri: 'https://i.pravatar.cc/160?img=12' }} />
                <Avatar.Fallback>GS</Avatar.Fallback>
              </Avatar>
            </Card.Header>
            <Card.Body className="items-center">
              <Card.Title>My App</Card.Title>
              <Card.Description className="text-center">
                Expo Router + HeroUI Native
              </Card.Description>
            </Card.Body>
            <Card.Footer className="justify-center">
              <Button
                isIconOnly
                size="sm"
                variant="tertiary"
                accessibilityLabel="Dismiss all toasts"
                onPress={() => toast.hide('all')}
              >
                <Button.Label>×</Button.Label>
              </Button>
            </Card.Footer>
          </Card>
        </View>
      </Surface>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ShowcaseTab)}>
        <Tabs.List>
          <Tabs.ScrollView>
            <Tabs.Indicator />
            <Tabs.Trigger value="overview">
              <Tabs.Label>Overview</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger value="forms">
              <Tabs.Label>Forms</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger value="navigation">
              <Tabs.Label>Navigation</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger value="overlays">
              <Tabs.Label>Overlays</Tabs.Label>
            </Tabs.Trigger>
          </Tabs.ScrollView>
        </Tabs.List>

        <Tabs.Content value="overview" className="gap-6 pt-6">
          <View className="gap-4">
            <SectionTitle
              title="Buttons, layout, media, and feedback"
              description="A compact pass over the foundational components used most often on real product screens."
            />

            <Card>
              <Card.Header className="gap-3">
                <Card.Title>Buttons and inline actions</Card.Title>
                <Card.Description>
                  `Button` plus lightweight text-link patterns are now available in the project shell.
                </Card.Description>
              </Card.Header>
              <Card.Body className="gap-4">
                <View className="flex-row flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="tertiary">Tertiary</Button>
                  <Button variant="danger">Danger</Button>
                </View>
                <View className="flex-row flex-wrap items-center gap-4">
                  <TextLink onPress={() => setActiveTab('navigation')}>
                    Jump to navigation patterns
                  </TextLink>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="tertiary"
                    accessibilityLabel="Dismiss all toasts"
                    onPress={() => toast.hide('all')}
                  >
                    <Button.Label>×</Button.Label>
                  </Button>
                </View>
              </Card.Body>
            </Card>

            <View className="gap-4 md:flex-row">
              <Surface className="flex-1 gap-4">
                <SectionTitle
                  title="Avatars and chips"
                  description="Useful for people, status, ownership, and compact metadata."
                />
                <View className="flex-row items-center gap-3">
                  <Avatar size="sm" color="success" alt="Account owner">
                    <Avatar.Fallback>AK</Avatar.Fallback>
                  </Avatar>
                  <Avatar size="md" color="warning" alt="Project manager">
                    <Avatar.Fallback>PM</Avatar.Fallback>
                  </Avatar>
                  <Avatar size="lg" color="danger" alt="Quality lead">
                    <Avatar.Fallback>QA</Avatar.Fallback>
                  </Avatar>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  <Chip>Starter</Chip>
                  <Chip variant="secondary" color="success">
                    <Chip.Label>Healthy</Chip.Label>
                  </Chip>
                  <Chip variant="soft" color="warning">
                    <Chip.Label>Needs Review</Chip.Label>
                  </Chip>
                </View>
              </Surface>

              <Surface variant="tertiary" className="flex-1 gap-4">
                <SectionTitle
                  title="Pressable feedback"
                  description="Reusable tactile feedback for cards, tiles, and custom interactions."
                />
                <PressableFeedback
                  className="overflow-hidden rounded-2xl"
                  onPress={() =>
                    toast.show({
                      variant: 'success',
                      label: 'Pressed custom tile',
                      description: 'This tile uses PressableFeedback with a ripple overlay.',
                    })
                  }
                >
                  <PressableFeedback.Ripple />
                  <View className="gap-2 rounded-2xl bg-accent-soft p-4">
                    <Text className="text-base font-medium text-foreground">Reusable tile</Text>
                    <Text className="text-sm leading-5 text-muted">
                      PressableFeedback makes custom surfaces feel native without rebuilding gesture feedback each time.
                    </Text>
                  </View>
                </PressableFeedback>
              </Surface>
            </View>

            <Alert status="accent">
              <Alert.Indicator>
                <Text className="pt-0.5 text-base">i</Text>
              </Alert.Indicator>
              <Alert.Content>
                <Alert.Title>Project status</Alert.Title>
                <Alert.Description>
                  HeroUI Native is installed, the provider is mounted, and this screen is now the working gallery for the rest of the app.
                </Alert.Description>
              </Alert.Content>
              <Button
                size="sm"
                onPress={() =>
                  toast.show({
                    variant: 'success',
                    label: 'Everything is connected',
                    description: 'You can now start pulling these patterns into feature screens.',
                  })
                }
              >
                Confirm
              </Button>
            </Alert>

            <Surface className="gap-4">
              <View className="flex-row items-center justify-between gap-3">
                <SectionTitle
                  title="Loading primitives"
                  description="Skeleton, SkeletonGroup, and Spinner provide consistent loading states."
                />
                <Button
                  size="sm"
                  variant="secondary"
                  onPress={() => setIsLoadingCard((current) => !current)}
                >
                  {isLoadingCard ? 'Show content' : 'Show loading'}
                </Button>
              </View>

              <SkeletonGroup isLoading={isLoadingCard} className="gap-4">
                <View className="flex-row items-center gap-3">
                  <SkeletonGroup.Item className="size-12 rounded-full">
                    <Avatar size="md" color="accent" alt="UI team">
                      <Avatar.Fallback>UI</Avatar.Fallback>
                    </Avatar>
                  </SkeletonGroup.Item>
                  <View className="flex-1 gap-2">
                    <SkeletonGroup.Item className="h-4 w-40 rounded-md">
                      <Text className="text-base font-medium text-foreground">
                        Design System Sync
                      </Text>
                    </SkeletonGroup.Item>
                    <SkeletonGroup.Item className="h-3 w-64 rounded-md">
                      <Text className="text-sm text-muted">
                        Shared loading state across multiple placeholders.
                      </Text>
                    </SkeletonGroup.Item>
                  </View>
                  <Spinner size="sm" color="warning" isLoading={isLoadingCard} />
                </View>

                <Skeleton
                  isLoading={isLoadingCard}
                  className="h-40 overflow-hidden rounded-2xl"
                >
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' }}
                    style={{ height: 160, width: '100%', borderRadius: 24 }}
                    contentFit="cover"
                  />
                </Skeleton>
              </SkeletonGroup>
            </Surface>
          </View>
        </Tabs.Content>

        <Tabs.Content value="forms" className="gap-6 pt-6">
          <SectionTitle
            title="Form building blocks"
            description="Text inputs, grouped inputs, search, selection controls, and validation are now represented with real state."
          />

          <Card>
            <Card.Body className="gap-5">
              <TextField isRequired isInvalid={emailInvalid}>
                <Label>Email</Label>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="name@company.com"
                />
                <Description>We use this for project notifications and releases.</Description>
                <FieldError>Enter a valid email address.</FieldError>
              </TextField>

              <TextField>
                <Label>Secure input with InputGroup</Label>
                <InputGroup>
                  <InputGroup.Prefix isDecorative>
                    <Text className="text-sm text-muted">#</Text>
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Project access code"
                    secureTextEntry
                  />
                  <InputGroup.Suffix isDecorative>
                    <Text className="text-sm text-muted">OTP</Text>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>

              <SearchField value={search} onChange={setSearch}>
                <Label>Search settings</Label>
                <SearchField.Group>
                  <SearchField.SearchIcon>
                    <Text className="text-sm text-muted">S</Text>
                  </SearchField.SearchIcon>
                  <SearchField.Input />
                  <SearchField.ClearButton>
                    <Text className="text-xs text-muted">x</Text>
                  </SearchField.ClearButton>
                </SearchField.Group>
                <Description>Type to filter the list-group preview below.</Description>
              </SearchField>
            </Card.Body>
          </Card>

          <View className="gap-4 md:flex-row">
            <Surface className="flex-1 gap-5">
              <TextField isInvalid={notesInvalid}>
                <Label>Implementation notes</Label>
                <TextArea
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Capture migration notes, design constraints, or rollout decisions."
                />
                <Description>Keep at least 16 characters for this demo state.</Description>
                <FieldError>Notes are a little too short.</FieldError>
              </TextField>

              <View className="gap-2">
                <Label>Verification code with InputOTP</Label>
                <Description>Fills six slots and calls onComplete when done.</Description>
                <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                  <InputOTP.Group>
                    <InputOTP.Slot index={0} />
                    <InputOTP.Slot index={1} />
                    <InputOTP.Slot index={2} />
                  </InputOTP.Group>
                  <InputOTP.Separator />
                  <InputOTP.Group>
                    <InputOTP.Slot index={3} />
                    <InputOTP.Slot index={4} />
                    <InputOTP.Slot index={5} />
                  </InputOTP.Group>
                </InputOTP>
              </View>

              <View className="gap-2">
                <Label>Team select</Label>
                <Select value={team} onValueChange={setTeam}>
                  <Select.Trigger>
                    <Select.Value placeholder="Choose a team" />
                    <Select.TriggerIndicator>
                      <Text className="text-sm text-muted">v</Text>
                    </Select.TriggerIndicator>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Overlay />
                    <Select.Content presentation="popover" width="trigger">
                      <Select.ListLabel className="mb-2">Assign owner</Select.ListLabel>
                      {TEAM_OPTIONS.map((option, index) => (
                        <React.Fragment key={option.value}>
                          <Select.Item value={option.value} label={option.label} />
                          {index < TEAM_OPTIONS.length - 1 ? <Separator className="my-1" /> : null}
                        </React.Fragment>
                      ))}
                    </Select.Content>
                  </Select.Portal>
                </Select>
              </View>
            </Surface>

            <Surface variant="secondary" className="flex-1 gap-5">
              <View className="gap-2">
                <Label>RadioGroup shipping preference</Label>
                <RadioGroup value={shipMode} onValueChange={setShipMode}>
                  <RadioGroup.Item value="standard">
                    <View className="flex-1">
                      <Label>Standard</Label>
                      <Description>Great for background sync and low urgency work.</Description>
                    </View>
                    <Radio />
                  </RadioGroup.Item>
                  <Separator className="my-2" />
                  <RadioGroup.Item value="express">
                    <View className="flex-1">
                      <Label>Express</Label>
                      <Description>Best for active milestone work and launches.</Description>
                    </View>
                    <Radio />
                  </RadioGroup.Item>
                </RadioGroup>
              </View>

              <ControlField
                isSelected={notificationsEnabled}
                onSelectedChange={setNotificationsEnabled}
              >
                <View className="flex-1">
                  <Label>Deployment alerts</Label>
                  <Description>Send push updates when preview builds finish.</Description>
                </View>
                <ControlField.Indicator />
              </ControlField>

              <ControlField
                isSelected={agreed}
                onSelectedChange={setAgreed}
                isInvalid={!agreed}
                className="flex-col items-start gap-2"
              >
                <View className="flex-row items-center gap-3">
                  <ControlField.Indicator>
                    <Checkbox />
                  </ControlField.Indicator>
                  <View className="flex-1 flex-row flex-wrap">
                    <Text className="text-sm text-foreground">I’m ready to move this HeroUI setup into real product screens and follow the </Text>
                    <TextLink onPress={() => setActiveTab('overview')}>
                      gallery patterns
                    </TextLink>
                    <Text className="text-sm text-foreground"> first.</Text>
                  </View>
                </View>
                <FieldError>Confirm this to satisfy the demo validation state.</FieldError>
              </ControlField>

              <View className="gap-3">
                <View className="flex-row items-center justify-between">
                  <Label>Volume slider</Label>
                  <Slider defaultValue={volume} value={volume} onChange={(value) => setVolume(value as number)}>
                    <Slider.Output />
                  </Slider>
                </View>
                <Slider value={volume} onChange={(value) => setVolume(value as number)}>
                  <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                  </Slider.Track>
                </Slider>
              </View>

              <View className="gap-3">
                <View className="flex-row items-center justify-between">
                  <Label>Budget range</Label>
                  <Text className="text-sm text-muted">
                    ${range[0]} - ${range[1]}
                  </Text>
                </View>
                <Slider
                  value={range}
                  onChange={(value) => setRange(value as number[])}
                  minValue={0}
                  maxValue={1000}
                  step={50}
                >
                  <Slider.Track>
                    {({ state }) => (
                      <>
                        <Slider.Fill />
                        {state.values.map((_, index) => (
                          <Slider.Thumb key={index} index={index} />
                        ))}
                      </>
                    )}
                  </Slider.Track>
                </Slider>
              </View>

              <View className="flex-row items-center justify-between rounded-2xl bg-surface-tertiary px-4 py-3">
                <View className="flex-1 gap-1">
                  <Label>Standalone switch</Label>
                  <Description>Useful outside form rows too.</Description>
                </View>
                <Switch isSelected={notificationsEnabled} onSelectedChange={setNotificationsEnabled}>
                  <Switch.Thumb />
                </Switch>
              </View>
            </Surface>
          </View>

          <Surface className="gap-3">
            <Label isInvalid={tagInvalid}>TagGroup categories</Label>
            <TagGroup
              selectionMode="multiple"
              selectedKeys={selectedTags}
              onSelectionChange={(keys) => setSelectedTags(new Set(Array.from(keys as Iterable<string>)))}
              onRemove={(keys) =>
                setTags((current) => current.filter((tag) => !(keys as Set<string>).has(tag.id)))
              }
              isInvalid={tagInvalid}
            >
              <TagGroup.List className="flex-row flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagGroup.Item key={tag.id} id={tag.id}>
                    <TagGroup.ItemLabel>{tag.label}</TagGroup.ItemLabel>
                    <TagGroup.ItemRemoveButton />
                  </TagGroup.Item>
                ))}
              </TagGroup.List>
              <Description hideOnInvalid>
                Selected: {Array.from(selectedTags).join(', ') || 'none'}
              </Description>
              <FieldError>Choose at least one category.</FieldError>
            </TagGroup>
          </Surface>
        </Tabs.Content>

        <Tabs.Content value="navigation" className="gap-6 pt-6">
          <SectionTitle
            title="Collections and navigation"
            description="Accordion, list groups, menu, tabs, tag filtering, and scroll-shadow utilities for denser information architecture."
          />

          <Accordion selectionMode="single" variant="surface" defaultValue="2">
            {FAQ_ITEMS.map((item) => (
              <Accordion.Item key={item.id} value={item.id}>
                <Accordion.Trigger>
                  <Text className="flex-1 text-base font-medium text-foreground">
                    {item.title}
                  </Text>
                  <Accordion.Indicator>
                    <Text className="text-base text-foreground">+</Text>
                  </Accordion.Indicator>
                </Accordion.Trigger>
                <Accordion.Content>
                  <Text className="px-6 pb-4 text-sm leading-6 text-muted">
                    {item.content}
                  </Text>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-4">
              <Menu>
                <Menu.Trigger asChild>
                  <Button variant="secondary">View options</Button>
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Overlay />
                  <Menu.Content presentation="popover" width={240}>
                    <Menu.Label className="mb-1">Layout style</Menu.Label>
                    <Menu.Group
                      selectionMode="single"
                      selectedKeys={menuSelection}
                      onSelectionChange={(keys) =>
                        setMenuSelection(new Set(Array.from(keys as Iterable<string>)))
                      }
                      >
                      <Menu.Item id="grid">
                        <Menu.ItemIndicator variant="dot">
                          <Text className="text-xs text-muted">•</Text>
                        </Menu.ItemIndicator>
                        <Menu.ItemTitle>Grid</Menu.ItemTitle>
                      </Menu.Item>
                      <Menu.Item id="stack">
                        <Menu.ItemIndicator variant="dot">
                          <Text className="text-xs text-muted">•</Text>
                        </Menu.ItemIndicator>
                        <Menu.ItemTitle>Stack</Menu.ItemTitle>
                      </Menu.Item>
                    </Menu.Group>
                    <Separator className="my-2" />
                    <Menu.Item
                      variant="danger"
                      onPress={() =>
                        toast.show({
                          variant: 'warning',
                          label: 'Menu action fired',
                          description: 'Danger actions can be styled directly inside Menu.Item.',
                        })
                      }
                    >
                      <Menu.ItemTitle>Reset demo state</Menu.ItemTitle>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Portal>
              </Menu>

              <ListGroup>
                {filteredItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index > 0 ? <Separator className="mx-4" /> : null}
                    <ListGroup.Item>
                      <ListGroup.ItemPrefix>
                        <Text className="text-lg">{item.emoji}</Text>
                      </ListGroup.ItemPrefix>
                      <ListGroup.ItemContent>
                        <ListGroup.ItemTitle>{item.title}</ListGroup.ItemTitle>
                        <ListGroup.ItemDescription>
                          {item.description}
                        </ListGroup.ItemDescription>
                      </ListGroup.ItemContent>
                      <ListGroup.ItemSuffix />
                    </ListGroup.Item>
                  </React.Fragment>
                ))}
                {filteredItems.length === 0 ? (
                  <ListGroup.Item>
                    <ListGroup.ItemContent>
                      <ListGroup.ItemTitle>No matches</ListGroup.ItemTitle>
                      <ListGroup.ItemDescription>
                        Try a broader search query in the forms tab.
                      </ListGroup.ItemDescription>
                    </ListGroup.ItemContent>
                  </ListGroup.Item>
                ) : null}
              </ListGroup>
            </View>

            <Surface variant="secondary" className="flex-1 gap-4">
              <SectionTitle
                title="ScrollShadow utility"
                description="Helpful for horizontal carousels and scrollable panels without relying on always-visible scrollbars."
              />
              <ScrollShadow LinearGradientComponent={LinearGradient}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-3">
                  {['Onboarding', 'Billing', 'Notifications', 'Roles', 'Analytics', 'Security'].map(
                    (label) => (
                      <Chip key={label} variant="secondary">
                        <Chip.Label>{label}</Chip.Label>
                      </Chip>
                    ),
                  )}
                </ScrollView>
              </ScrollShadow>
            </Surface>
          </View>
        </Tabs.Content>

        <Tabs.Content value="overlays" className="gap-6 pt-6">
          <SectionTitle
            title="Dialogs, popovers, sheets, and toasts"
            description="Overlay components are connected to the provider and ready for real flows like confirmation, contextual help, and transient notifications."
          />

          <View className="flex-row flex-wrap gap-3">
            <Dialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Dialog.Trigger asChild>
                <Button onPress={() => setIsDialogOpen(true)}>Open dialog</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                  <Dialog.Close>
                    <Text className="text-base text-muted">x</Text>
                  </Dialog.Close>
                  <View className="mb-5 gap-2">
                    <Dialog.Title>Ship the HeroUI rollout?</Dialog.Title>
                    <Dialog.Description>
                      This dialog is wired for confirmation flows such as publishing a release or applying a migration.
                    </Dialog.Description>
                  </View>
                  <View className="flex-row justify-end gap-3">
                    <Button variant="tertiary" size="sm" onPress={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onPress={() => {
                        setIsDialogOpen(false);
                        toast.show({
                          variant: 'success',
                          label: 'Dialog confirmed',
                          description: 'A real app action could continue from here.',
                        });
                      }}
                    >
                      Confirm
                    </Button>
                  </View>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog>

            <Popover>
              <Popover.Trigger asChild>
                <Button variant="secondary">Open popover</Button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Overlay />
                <Popover.Content
                  presentation="popover"
                  width={280}
                  className="gap-2 rounded-2xl border border-border px-5 py-4"
                >
                  <Popover.Close className="absolute right-3 top-3">
                    <Text className="text-base text-muted">x</Text>
                  </Popover.Close>
                  <Popover.Title>Popover details</Popover.Title>
                  <Popover.Description>
                    Use popovers for quick settings, help text, or lightweight contextual controls anchored to a trigger.
                  </Popover.Description>
                </Popover.Content>
              </Popover.Portal>
            </Popover>

            <BottomSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <BottomSheet.Trigger asChild>
                <Button variant="secondary" onPress={() => setIsSheetOpen(true)}>
                  Open bottom sheet
                </Button>
              </BottomSheet.Trigger>
              <BottomSheet.Portal>
                <BottomSheet.Overlay />
                <BottomSheet.Content snapPoints={['45%']}>
                  <View className="mb-6 gap-2 items-center">
                    <BottomSheet.Title>Bottom sheet</BottomSheet.Title>
                    <BottomSheet.Description className="text-center">
                      Great for mobile-first action menus, detail drawers, or multi-step compact flows.
                    </BottomSheet.Description>
                  </View>
                  <View className="gap-3">
                    <Button
                      onPress={() => {
                        setIsSheetOpen(false);
                        toast.show('Bottom sheet action completed');
                      }}
                    >
                      Continue
                    </Button>
                    <Button variant="tertiary" onPress={() => setIsSheetOpen(false)}>
                      Dismiss
                    </Button>
                  </View>
                </BottomSheet.Content>
              </BottomSheet.Portal>
            </BottomSheet>

            <Button
              variant="secondary"
              onPress={() =>
                toast.show({
                  component: (props) => (
                    <Toast variant="accent" {...props}>
                      <Toast.Title>Custom toast</Toast.Title>
                      <Toast.Description>
                        The toast API can render full custom components when the simple config object is not enough.
                      </Toast.Description>
                      <Toast.Action onPress={() => props.hide()}>Close</Toast.Action>
                      <Toast.Close className="absolute right-2 top-2">
                        <Text className="text-base text-muted">x</Text>
                      </Toast.Close>
                    </Toast>
                  ),
                })
              }
            >
              Show toast
            </Button>
          </View>
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
