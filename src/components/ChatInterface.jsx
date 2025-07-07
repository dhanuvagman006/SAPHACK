import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Fade,
  Grow,
  CircularProgress,
  Divider,
  Badge
} from '@mui/material'
import { Send, Mic, MicOff, Bot, User, Sparkles, TrendingUp, Package, Users } from 'lucide-react'

// Mock AI responses for different queries
const aiResponses = {
  stock: "I can help you check stock levels. Currently, you have low stock on Toor Dal (12 kg) and Sunflower Oil (8 bottles). Would you like me to help you contact distributors for reordering?",
  sales: "Your sales are performing well! This month you've achieved ₹67,000 in sales with a 20% profit margin. Groceries category is your top performer at 45% of total sales.",
  inventory: "Your inventory is valued at ₹1,25,340 with 225 total items. You have 3 low stock alerts that need attention. Would you like me to show you the distributor details?",
  reorder: "I've prepared reorder suggestions based on your sales patterns. Toor Dal needs 25 kg, Sunflower Oil needs 20 bottles. I can connect you with nearby distributors. Shall I show their contact details?",
  analytics: "Based on your data, your best-selling items are Basmati Rice and Tea Leaves. I recommend increasing stock for these items before festival season. Your profit margins are healthiest on Groceries category.",
  distributors: "I found 5 nearby distributors for your required items. Metro Cash & Carry (2.1 km), Reliance Smart Bazaar (1.8 km), and D-Mart (3.2 km) have the best rates for bulk purchases.",
  competitors: "Nearby retailers are performing well! Sharma Kirana Store is selling 450 units of Basmati Rice, while Super Fresh Mart moved 520 units. Check the 'Distributors' tab for detailed competitor analysis.",
  yearcomparison: "Great question! Comparing July 2024 vs 2025: Basmati Rice sales grew 40% (890→1250 units), Sunflower Oil up 33%, and Tea Leaves increased 36%. Check the Year-over-Year tab for complete analysis!",
  default: "I'm your AI assistant for grocery store management. I can help you with inventory queries, sales analysis, reorder suggestions, distributor contacts, competitor analysis, and business insights. What would you like to know?"
}

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! I'm your AI assistant for grocery store management. How can I help you manage your kirana store today? 🛒",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAiResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('stock') || message.includes('inventory')) {
      return message.includes('low') ? aiResponses.stock : aiResponses.inventory
    }
    if (message.includes('sales') || message.includes('revenue')) {
      return aiResponses.sales
    }
    if (message.includes('reorder') || message.includes('purchase') || message.includes('buy')) {
      return aiResponses.reorder
    }
    if (message.includes('distributor') || message.includes('supplier') || message.includes('wholesale')) {
      return aiResponses.distributors
    }
    if (message.includes('competitor') || message.includes('retail') || message.includes('nearby') || message.includes('selling')) {
      return aiResponses.competitors
    }
    if (message.includes('year') || message.includes('july') || message.includes('2024') || message.includes('comparison')) {
      return aiResponses.yearcomparison
    }
    if (message.includes('analytics') || message.includes('insight') || message.includes('recommend')) {
      return aiResponses.analytics
    }
    
    return aiResponses.default
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response with delay and typing indicator
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: getAiResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onstart = () => {
        setIsListening(true)
      }
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }
      
      recognition.onerror = () => {
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognition.start()
    } else {
      alert('Speech recognition is not supported in your browser')
    }
  }

  const quickActions = [
    { 
      label: "Check Low Stock", 
      action: "What items have low stock?", 
      icon: <Package size={16} />,
      color: "error"
    },
    { 
      label: "Find Distributors", 
      action: "Show me nearby distributors for Toor Dal", 
      icon: <TrendingUp size={16} />,
      color: "primary"
    },
    { 
      label: "Competitor Analysis", 
      action: "What are nearby retailers selling the most?", 
      icon: <Users size={16} />,
      color: "secondary"
    },
    { 
      label: "Year Comparison", 
      action: "Compare this July with last year's sales", 
      icon: <Sparkles size={16} />,
      color: "success"
    }
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          <Bot size={24} />
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
            AI Assistant
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Your intelligent grocery store management companion
          </Typography>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={8} 
            sx={{ 
              height: '65vh', 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: '1px solid',
              borderColor: 'primary.light'
            }}
          >
            {/* Chat Header */}
            <Box sx={{ 
              p: 2, 
              background: 'rgba(255,255,255,0.95)', 
              backdropFilter: 'blur(10px)',
              borderBottom: 1, 
              borderColor: 'divider'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Badge color="success" variant="dot">
                  <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                    <Bot size={16} />
                  </Avatar>
                </Badge>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    KiranaBot AI
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    ● Online - Ready to help
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Messages Area */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                p: 2, 
                overflowY: 'auto',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                position: 'relative'
              }}
            >
              {messages.map((message, index) => (
                <Fade in={true} timeout={500} key={message.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      mb: 3,
                      opacity: 0,
                      animation: 'slideIn 0.5s ease forwards',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '75%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                          width: 40,
                          height: 40,
                          boxShadow: 3
                        }}
                      >
                        {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                      </Avatar>
                      <Paper
                        elevation={4}
                        sx={{
                          p: 2.5,
                          borderRadius: 3,
                          background: message.sender === 'user' 
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                          color: message.sender === 'user' ? 'white' : 'text.primary',
                          boxShadow: message.sender === 'user' 
                            ? '0 8px 32px rgba(102, 126, 234, 0.3)'
                            : '0 8px 32px rgba(0, 0, 0, 0.1)',
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            width: 0,
                            height: 0,
                            border: '8px solid transparent',
                            borderTopColor: message.sender === 'user' ? '#667eea' : '#ffffff',
                            top: 20,
                            [message.sender === 'user' ? 'right' : 'left']: -16
                          }
                        }}
                      >
                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                          {message.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.8,
                            display: 'block',
                            mt: 1,
                            textAlign: message.sender === 'user' ? 'right' : 'left'
                          }}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                </Fade>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <Fade in={true}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                        <Bot size={20} />
                      </Avatar>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <CircularProgress size={16} />
                        <Typography variant="body2" color="textSecondary">
                          AI is thinking...
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                </Fade>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box sx={{ 
              p: 2.5, 
              background: 'rgba(255,255,255,0.95)', 
              backdropFilter: 'blur(10px)',
              borderTop: 1, 
              borderColor: 'divider' 
            }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Ask me about your inventory, sales, or anything else... (Hindi/English supported)"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  size="medium"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: 'white',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
                <IconButton
                  onClick={handleVoiceInput}
                  color={isListening ? "secondary" : "default"}
                  sx={{ 
                    mb: 0.5,
                    background: isListening ? 'secondary.light' : 'grey.100',
                    '&:hover': {
                      background: isListening ? 'secondary.main' : 'grey.200'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isListening ? <MicOff /> : <Mic />}
                </IconButton>
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  sx={{ 
                    mb: 0.5,
                    borderRadius: 2,
                    px: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    },
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  <Send size={20} />
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {quickActions.map((action, index) => (
                  <Chip
                    key={index}
                    label={action.label}
                    variant="outlined"
                    clickable
                    onClick={() => setInputText(action.action)}
                    sx={{ justifyContent: 'flex-start' }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Capabilities
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                • Grocery inventory management and stock monitoring
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                • Sales analytics and daily/monthly reporting
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                • Nearby distributor and supplier connections
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                • Business insights and reorder recommendations
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • Voice commands in Hindi and English
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChatInterface
