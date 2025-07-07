import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  TextField,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import {
  ShoppingCart,
  Plus,
  Minus,
  Delete,
  CreditCard,
  CheckCircle,
  Receipt,
  Package
} from 'lucide-react'

// Available products for checkout - Indian grocery/home items
const availableProducts = [
  { id: 1, name: 'Basmati Rice (1kg)', price: 180, stock: 45, category: 'Staples' },
  { id: 2, name: 'Toor Dal (1kg)', price: 120, stock: 12, category: 'Pulses' },
  { id: 3, name: 'Sunflower Oil (1L)', price: 145, stock: 8, category: 'Oils' },
  { id: 4, name: 'Wheat Flour (5kg)', price: 220, stock: 25, category: 'Staples' },
  { id: 5, name: 'Sugar (1kg)', price: 45, stock: 35, category: 'Staples' },
  { id: 6, name: 'Tea Leaves (250g)', price: 85, stock: 60, category: 'Beverages' },
  { id: 7, name: 'Detergent Powder (1kg)', price: 95, stock: 18, category: 'Home Care' },
  { id: 8, name: 'Toilet Paper (4 rolls)', price: 160, stock: 22, category: 'Home Care' }
]

function Checkout() {
  const [cart, setCart] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [invoiceDialog, setInvoiceDialog] = useState(false)

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + tax

  const handleCheckout = () => {
    if (cart.length === 0 || !customerInfo.name || !customerInfo.email) {
      return
    }
    setCheckoutComplete(true)
    setTimeout(() => {
      setInvoiceDialog(true)
    }, 2000)
  }

  const generateInvoiceNumber = () => {
    return `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }

  const resetCheckout = () => {
    setCart([])
    setCustomerInfo({ name: '', email: '', phone: '' })
    setCheckoutComplete(false)
    setInvoiceDialog(false)
  }

  if (checkoutComplete && !invoiceDialog) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
        <CheckCircle size={80} color="#4caf50" />
        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Processing your order...
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Checkout & Billing
      </Typography>

      <Grid container spacing={3}>
        {/* Available Products */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Products
              </Typography>
              <Grid container spacing={2}>
                {availableProducts.map((product) => (
                  <Grid item xs={12} sm={6} key={product.id}>
                    <Card variant="outlined">
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {product.name}
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                          ₹{product.price}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Chip 
                            label={`${product.stock} in stock`} 
                            size="small" 
                            color={product.stock > 10 ? "success" : "warning"}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Plus size={16} />}
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                          >
                            Add
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Shopping Cart & Checkout */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shopping Cart ({cart.length} items)
              </Typography>
              
              {cart.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <ShoppingCart size={64} color="#ccc" />
                  <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                    Your cart is empty
                  </Typography>
                </Box>
              ) : (
                <>
                  <List>
                    {cart.map((item) => (
                      <ListItem key={item.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <Package size={20} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={`₹${item.price} each`}
                        />
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={16} />
                          </IconButton>
                          <Typography variant="body1" sx={{ minWidth: 20, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Delete size={16} />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  {/* Order Summary */}
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography>Subtotal:</Typography>
                      <Typography>₹{subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography>GST (18%):</Typography>
                      <Typography>₹{tax.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary">
                        ₹{total.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          {cart.length > 0 && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Customer Name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    />
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<CreditCard />}
                  onClick={handleCheckout}
                  disabled={!customerInfo.name || !customerInfo.email || cart.length === 0}
                  sx={{ mt: 3 }}
                >
                  Process Payment - ₹{total.toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Invoice Dialog */}
      <Dialog open={invoiceDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <Receipt />
            Invoice Generated
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="success" sx={{ mb: 3 }}>
            Payment processed successfully! Invoice has been generated.
          </Alert>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              INVOICE
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Invoice No: {generateInvoiceNumber()}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Date: {new Date().toLocaleDateString()}
            </Typography>
            
            <Box sx={{ my: 3 }}>
              <Typography variant="h6" gutterBottom>Bill To:</Typography>
              <Typography>{customerInfo.name}</Typography>
              <Typography>{customerInfo.email}</Typography>
              {customerInfo.phone && <Typography>{customerInfo.phone}</Typography>}
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>                    <TableCell align="right">₹{item.price}</TableCell>
                    <TableCell align="right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right"><strong>Subtotal:</strong></TableCell>
                    <TableCell align="right"><strong>₹{subtotal.toFixed(2)}</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right"><strong>GST (18%):</strong></TableCell>
                    <TableCell align="right"><strong>₹{tax.toFixed(2)}</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="right"><strong>Total:</strong></TableCell>
                    <TableCell align="right"><strong>₹{total.toFixed(2)}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.print()}>Print Invoice</Button>
          <Button variant="contained" onClick={resetCheckout}>
            New Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Checkout
